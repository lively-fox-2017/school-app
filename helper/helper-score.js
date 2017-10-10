function score(great) {
  let greatTampung = ''

  if(great >= 85 && great <= 100 ){
    greatTampung += 'A'
  }else if (great >= 70 && great <= 84 ) {
    greatTampung += 'B'
  }else if (great >= 55 && great <= 69 ) {
    greatTampung += 'C'
  }else if (great <= 55 ) {
    greatTampung += 'E'
  }else {
    greatTampung += 'empty'
  }

  return greatTampung
}

module.exports = score
