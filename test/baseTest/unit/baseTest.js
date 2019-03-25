/**
 * 无vue js测试
 * */

describe('base test',function(){
  it('test case1',function(){
    expect([1,2,3]).to.include(2);
  });
  it('test case2',function(){
    expect([1,2,3]).to.include(3)
  })
});

