"use strict";

// інфо про компанію
var company = {
  site: 'https://rt-investing.com',
  email: 'email@email.com',
  phoneRu: '+phoneRu',
  phoneEn: '+phoneEn',
  phonePo: '+phonePo',
  brand: 'RT-Investing',
  company: 'RT-Investing LTD',
  registrationNumber: '1234567890',
  address: 'C/O LC02 504, Choc Bay, Castries, Saint Lucia'
}; // підстановка тексту/атрибутів

$('.company-site').html(company.site);
$('.company-email').html(company.email);
$('.company-brand').html(company.brand);
$('.company-name').html(company.company);
$('.company-address').html(company.address);
$('.company-registrationNumber').html(company.registrationNumber);
$('a[data-email]').attr('href', 'mailto:' + company.email);
$('a[data-phoneRu]').attr('href', 'tel:' + company.phoneRu).text(company.phoneRu);
$('a[data-phoneEn]').attr('href', 'tel:' + company.phoneEn).text(company.phoneEn);