"use strict";var company={site:"https://pt-finance.com",email:"support@pt-finance.com",phoneRu:"+phoneRu",phoneEn:"+phoneEn",phonePo:"+phonePo",brand:"PrimeTime Finance",company:"PrimeGlobalTrade Ltd.",registrationNumber:"28624 IPM 2019",address:"Lowmans Leeward, P.O. VC0110, Sion Hill, KINGSTOWN, SVG"};$(".company-site").html(company.site),$(".company-email").html(company.email),$(".company-brand").html(company.brand),$(".company-name").html(company.company),$(".company-address").html(company.address),$(".company-registrationNumber").html(company.registrationNumber),$("a[data-email]").attr("href","mailto:"+company.email),$("a[data-phoneRu]").attr("href","tel:"+company.phoneRu).text(company.phoneRu),$("a[data-phoneEn]").attr("href","tel:"+company.phoneEn).text(company.phoneEn),$("a[data-phonePo]").attr("href","tel:"+company.phonePo).text(company.phonePo);