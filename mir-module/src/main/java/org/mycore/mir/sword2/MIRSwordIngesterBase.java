package org.mycore.mir.sword2;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mycore.access.MCRAccessException;
import org.mycore.common.MCRPersistenceException;
import org.mycore.common.config.MCRConfiguration;
import org.mycore.datamodel.classifications2.MCRCategoryID;
import org.mycore.datamodel.metadata.MCRDerivate;
import org.mycore.datamodel.metadata.MCRMetadataManager;
import org.mycore.datamodel.metadata.MCRObjectID;
import org.mycore.datamodel.niofs.MCRPath;
import org.mycore.datamodel.niofs.utils.MCRFileCollectingFileVisitor;
import org.mycore.sword.application.MCRSwordIngester;
import org.mycore.sword.application.MCRSwordLifecycleConfiguration;
import org.mycore.sword.application.MCRSwordMediaHandler;

public abstract class MIRSwordIngesterBase implements MCRSwordIngester {

    private static final Logger LOGGER = LogManager.getLogger();


    private MCRSwordMediaHandler mcrSwordMediaHandler = new MCRSwordMediaHandler();

    private MCRSwordLifecycleConfiguration lifecycleConfiguration;


    protected MCRCategoryID getState() {
        return new MCRCategoryID("state", MCRConfiguration.instance()
            .getString("MCR.Sword." + this.lifecycleConfiguration.getCollection() + ".State"));
    }

    @Override
    public void init(MCRSwordLifecycleConfiguration lifecycleConfiguration) {
        this.lifecycleConfiguration = lifecycleConfiguration;
    }

    @Override
    public void destroy() {

    }

    protected MCRSwordLifecycleConfiguration getLifecycleConfiguration() {
        return lifecycleConfiguration;
    }

    protected void setLifecycleConfiguration(MCRSwordLifecycleConfiguration lifecycleConfiguration) {
        this.lifecycleConfiguration = lifecycleConfiguration;
    }

    protected MCRSwordMediaHandler getMediaHandler() {
        return mcrSwordMediaHandler;
    }

    /**
     * Sets a main file if not present.
     * @param derivateID the id of the derivate
     */
    protected static void setDefaultMainFile(String derivateID) {
        MCRPath path = MCRPath.getPath(derivateID, "/");
        try {
            MCRFileCollectingFileVisitor<Path> visitor = new MCRFileCollectingFileVisitor<>();
            Files.walkFileTree(path, visitor);
            MCRDerivate derivate = MCRMetadataManager.retrieveMCRDerivate(MCRObjectID.getInstance(derivateID));
            visitor.getPaths().stream()
                .map(MCRPath.class::cast)
                .filter(p -> !p.getOwnerRelativePath().endsWith(".xml"))
                .findFirst()
                .ifPresent(file -> {
                    derivate.getDerivate().getInternals().setMainDoc(file.getOwnerRelativePath());
                    try {
                        MCRMetadataManager.update(derivate);
                    } catch (MCRPersistenceException | MCRAccessException e) {
                        LOGGER.error("Could not set main file!", e);
                    }
                });
        } catch (IOException e) {
            LOGGER.error("Could not set main file!", e);
        }
    }

}
