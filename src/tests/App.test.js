
/*
    Tresting allTrue function
*/
const allTrue = (obj) => {
    return Object.keys(obj).every((i) => {
      return obj[i];
    })
  }

  test('check if all object property values are true', ()=>{
    let testObj = {
        a: true,
        b: true, 
        c: true
    }
    let valid = allTrue(testObj);
      expect(valid).toBe(true);
  })

 