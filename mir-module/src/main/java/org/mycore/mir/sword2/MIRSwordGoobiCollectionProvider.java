package org.mycore.mir.sword2;

public class MIRSwordGoobiCollectionProvider extends MIRSwordCollectionProvider {

    public MIRSwordGoobiCollectionProvider(){
        super();
        mirSwordIngester = new MIRSwordGoobiIngester();
    }

}
