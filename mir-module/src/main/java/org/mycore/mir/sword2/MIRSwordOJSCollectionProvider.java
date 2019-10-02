package org.mycore.mir.sword2;

public class MIRSwordOJSCollectionProvider extends MIRSwordCollectionProvider {

    public MIRSwordOJSCollectionProvider(){
        super();
        mirSwordIngester = new MIRSwordOJSIngester();
    }

}
