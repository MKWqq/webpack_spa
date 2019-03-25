// import WXSpace from '../../../../client/mobile/home/page/WXSpace.vue'
import APP from '../../../../client/home/APP.vue'

describe('WXSpace',function(){
  it('has a created hook',function(){
    expect(APP.created).to.be.an.instanceof(Function)
  });

  it('sets the correct default data',function(){
    var defaultData=APP.data();
    expect(defaultData.isShowDOM).to.be.an.false;
  });
});

