"use strict";var company={site:"https://ef-invest.com",email:"email@email.com",phoneRu:"+phoneRu",phoneEn:"+phoneEn",phonePo:"+phonePo",brand:"Eclipse Finance",company:"ECLIPSE INVEST LTD",registrationNumber:"1234567890",address:"Joshua Complex, P.O. VC0280, Arnos Vale, WINDWARD, St. Vincent and The Grenadines"};$(".company-site").html(company.site),$(".company-email").html(company.email),$(".company-brand").html(company.brand),$(".company-name").html(company.company),$(".company-address").html(company.address),$(".company-registrationNumber").html(company.registrationNumber),$("a[data-email]").attr("href","mailto:"+company.email),$("a[data-phoneRu]").attr("href","tel:"+company.phoneRu).text(company.phoneRu),$("a[data-phoneEn]").attr("href","tel:"+company.phoneEn).text(company.phoneEn),$("a[data-phonePo]").attr("href","tel:"+company.phonePo).text(company.phonePo);