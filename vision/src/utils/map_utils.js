const name2pinyin = {
  'United Arab Emirates': 'AE.geo',
  'Antigua and Barbuda': 'AG.geo',
  Albania: 'AL.geo',
  Armenia: 'AM.geo',
  Argentina: 'AR.geo',
  Austria: 'AT.geo',
  Australia: 'AU.geo',
  Aruba: 'AW.geo',
  Barbados: 'BB.geo',
  Belgium: 'BE.geo',
  Bulgaria: 'BG.geo',
  Bahrain: 'BH.geo',
  Brazil: 'BR.geo',
  Bahamas: 'BS.geo',
  Belarus: 'BY.geo',
  Belize: 'BZ.geo',
  Canada: 'CA.geo',
  Switzerland: 'CH.geo',
  Chile: 'CL.geo',
  Colombia: 'CO.geo',
  'Costa Rica': 'CR.geo',
  Cuba: 'CU.geo',
  Cyprus: 'CY.geo',
  'Czech Republic': 'CZ.geo',
  Germany: 'DE.geo',
  Denmark: 'DK.geo',
  Ecuador: 'EC.geo',
  Estonia: 'EE.geo',
  Spain: 'ES.geo',
  Finland: 'FI.geo',
  Fiji: 'FJ.geo',
  France: 'FR.geo',
  'United Kingdom': 'GB.geo',
  Grenada: 'GD.geo',
  Georgia: 'GE.geo',
  Greece: 'GR.geo',
  Guatemala: 'GT.geo',
  Guyana: 'GY.geo',
  Croatia: 'HR.geo',
  Hungary: 'HU.geo',
  Ireland: 'IE.geo',
  Israel: 'IL.geo',
  Iceland: 'IS.geo',
  Italy: 'IT.geo',
  Jamaica: 'JM.geo',
  Japan: 'JP.geo',
  Kyrgyzstan: 'KG.geo',
  Kuwait: 'KW.geo',
  Kazakhstan: 'KZ.geo',
  'Saint Lucia': 'LC.geo',
  Lithuania: 'LT.geo',
  Luxembourg: 'LU.geo',
  Latvia: 'LV.geo',
  Montenegro: 'ME.geo',
  Malta: 'MT.geo',
  Mauritius: 'MU.geo',
  Mexico: 'MX.geo',
  Netherlands: 'NL.geo',
  Norway: 'NO.geo',
  'New Zealand': 'NZ.geo',
  Oman: 'OM.geo',
  Panama: 'PA.geo',
  Philippines: 'PH.geo',
  Poland: 'PL.geo',
  'Puerto Rico': 'PR.geo',
  Portugal: 'PT.geo',
  Paraguay: 'PY.geo',
  Qatar: 'QA.geo',
  Romania: 'RO.geo',
  Serbia: 'RS.geo',
  Seychelles: 'SC.geo',
  Sweden: 'SE.geo',
  Singapore: 'SG.geo',
  Slovenia: 'SI.geo',
  Slovakia: 'SK.geo',
  Suriname: 'SR.geo',
  'El Salvador': 'SV.geo',
  Thailand: 'TH.geo',
  Turkmenistan: 'TM.geo',
  Turkey: 'TR.geo',
  'Trinidad and Tobago': 'TT.geo',
  Ukraine: 'UA.geo',
  'United States': 'US.geo',
  Uruguay: 'UY.geo',
  Uzbekistan: 'UZ.geo',
  'South Africa': 'ZA.geo'
}
export function getProvinceMapInfo (arg) {
  const path = `/static/map/countries/${name2pinyin[arg]}.json`
  return {
    key: name2pinyin[arg],
    path: path
  }
}
