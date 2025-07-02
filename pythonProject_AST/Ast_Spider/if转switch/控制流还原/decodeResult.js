function test(cU, cV) {
  var cZ = [];
  var d0 = 0;
  var d1 = 0;
  while (d0 < cU) {
    cZ[(d0 + cV) % cU] = [];
    d0++;
  }
  while (d1 < cU) {
    var d2 = cU - 1;
    while (d2 >= 0) {
      cZ[d1][(d2 + cV * d1) % cU] = cZ[d2];
      d2--;
    }
    d1++;
  }
  return cZ;
}