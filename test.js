const axios = require('axios')
const cheerio = require('cheerio');
const urlPgmenos = [['ACHOCOLATADO LIQ NESCAU 200ML','0'],['ACHOCOLATADO LIQ NESCAU ACTIV-GO 180ML','https://www.superpaguemenos.com.br/beb-lactea-nescau-180ml-chocolate/p'],['ACHOCOLATADO LIQ TODDYNHO 200ML','https://www.superpaguemenos.com.br/achocolatado-liquido-toddynho-200ml/p'],['AGUA DE COCO KERO COCO 1L','https://www.superpaguemenos.com.br/agua-de-coco-kero-coco-1l/p'],['AGUA MINERAL BONAFONT  500ML','https://www.superpaguemenos.com.br/agua-mineral-bonafont-sem-gas-500ml/p'],['AGUA MINERAL BONAFONT 1,5L','0'],['AGUA MINERAL CRYSTAL C/GAS 1,5L','https://www.superpaguemenos.com.br/agua-mineral-crystal-com-gas-15l/p'],['AGUA MINERAL CRYSTAL C/GAS 500ML ','https://www.superpaguemenos.com.br/agua-mineral-crystal-com-gas-500ml/p'],['AGUA MINERAL CRYSTAL S/GAS 1,5L','https://www.superpaguemenos.com.br/agua-mineral-crystal-sem-gas-15l/p'],['AGUA MINERAL CRYSTAL S/GAS 500ML ','https://www.superpaguemenos.com.br/agua-mineral-crystal-sem-gas-500ml/p'],['AGUA MINERAL IBIRA S/GAS 1,5L','0'],['AGUA MINERAL MINALBA C/GAS 510ML','0'],['AGUA MINERAL PRATA C/GAS 510ML ','https://www.superpaguemenos.com.br/agua-prata-com-gas-510ml/p'],['AGUA MINERAL SAO LOURENCO C/GAS 1260ML','https://www.superpaguemenos.com.br/agua-mineral-sao-lourenco-com-gas-126l/p'],['AGUA MINERAL SAO LOURENCO C/GAS 300ML ','0'],['AMACIANTE P/ ROUPA COMFORT EXPLOSAO AZUL 1,8L','https://www.superpaguemenos.com.br/amaciante-comfort-18l-trad-explosao-azul/p'],['AMACIANTE P/ ROUPA MON BIJOU + PERFUME 1,7L','0'],['AMACIANTE P/ ROUPA MON BIJOU PUREZA AZUL 2L','0'],['AZEITE TRAD VD ANDORINHA  500ML','https://www.superpaguemenos.com.br/azeite-portugues-andorinha-extra-virgem-500ml/p'],['BALA DE GELATINA FINI AMORA 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA DE GELATINA FINI AROS MORANGO 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA DE GELATINA FINI BANANAS 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA DE GELATINA FINI BEIJO MORANGO 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA DE GELATINA FINI MINHOCAS CITRICAS 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA DE GELATINA FINI URSINHOS CITRICO 110G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA DE GELATINA FINIBURGUERS 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BALA MINHOCAS FINI 100G','https://www.superpaguemenos.com.br/bala-gelatina-fini-amora-100g/p'],['BATATA PALHA YOKI 100G','https://www.superpaguemenos.com.br/batata-palha-yoki-105g-tradicional/p'],['BATATA PALHA YOKI EXTRA FINA 100g','https://www.superpaguemenos.com.br/batata-palha-yoki-100g-extrafina/p'],['BISCOITO BAUDUCCO LEVISSIMO AGUA E SAL 200G','https://www.superpaguemenos.com.br/biscoito-de-agua-e-sal-bauducco-levissimo-200g/p'],['BISCOITO BAUDUCCO LEVISSIMO CRACKER 200G','https://www.superpaguemenos.com.br/biscoito-cracker-bauducco-leve-200g/p'],['BISCOITO CASSINI POLVILHO 100G','https://www.superpaguemenos.com.br/bisc-polvilho-cassini-100g-palito/p'],['CERVEJA AMSTEL 600ML','0'],['CERVEJA ANTARCTICA SUB ZERO LT 350ML','https://www.superpaguemenos.com.br/cerveja-antarctica-subzero-350ml/p'],['CERVEJA BOHEMIA LATA 350ML','https://www.superpaguemenos.com.br/cerveja-bohemia-350ml/p'],['CERVEJA BUDWEISER LN 330ML','https://www.superpaguemenos.com.br/cerveja-budweiser-one-way-330ml/p'],['CERVEJA BUDWEISER LN ZERO 330ML','0'],['CERVEJA EISEN PIL SLEEK DES 350ML','https://www.superpaguemenos.com.br/cerveja-eisenbahn-sleek-350ml/p'],['CERVEJA SKOL BEATS GT LATA 269ml','https://www.superpaguemenos.com.br/cerveja-skol-269ml/p'],['CERVEJA SKOL LT 350ML','https://www.superpaguemenos.com.br/cerveja-skol-350ml/p'],['CERVEJA SKOL PURO MALTE LATA 350ML','0'],['CERVEJA STELLA ARTOIS ONE WAY 600ml','https://www.superpaguemenos.com.br/cerveja-stella-artois-premium-lager-600ml/p'],['CHA CL VERDE GUAR/CURCUMA PET 900ml','0'],['CHA VERDE FEEL GOOD 1L','0'],['CHA VERDE FEEL GOOD AMORA 1L','0'],['CHICLETE FINI CHICLE SALADA DE FRUTAS 80g','https://www.superpaguemenos.com.br/bala-gelatina-fini-tubinho-doce-80g/p'],['CHICLETE FINI MELANCIA 80GR','https://www.superpaguemenos.com.br/goma-mascar-fini-80g-melancia/p'],['CHOCOLATE DOLCA AO LEITE','0'],['CHOCOLATE DOLCA NEGRO 100g','0'],['CHOCOLATE LACTA BIS AO LEITE BLACK 100,8G','https://www.superpaguemenos.com.br/chocolate-bis-oreo-1008g/p'],['CHOCOLATE LACTA BIS AO LEITE PRETO 126G','https://www.superpaguemenos.com.br/chocolate-bis-oreo-1008g/p'],['CHOCOLATE LACTA BIS BRANCO 126G','https://www.superpaguemenos.com.br/chocolate-bis-oreo-1008g/p'],['CHOCOLATE NESQUIK AO LEITE 100g','0'],['CHOCOLATE NESTLE ALPINO GIANDUIA TABLETE 85G','https://www.superpaguemenos.com.br/choc-jumbo-alpino-85g-br/p'],['CHOCOLATE NESTLE CRUNCH TABLETE 80G','https://www.superpaguemenos.com.br/choc-barra-crunch-80g-chocolate/p'],['CHOCOLATE NESTLE KITKAT IMP  AO LEITE 41,5G','https://www.superpaguemenos.com.br/chocolate-kit-kat-wafer-ao-leite-415g/p'],['CHOCOLATE NESTLE TABL ALPINO 90G ','https://www.superpaguemenos.com.br/choc-jumbo-alpino-85g-br/p'],['CHOCOLATE NESTLE TABL SUFLAIR 80g','https://www.superpaguemenos.com.br/chocolate-suflair-duo-80g/p'],['CREME DE LEITE NESTLE LEVISSIMO 200g','https://www.superpaguemenos.com.br/creme-leite-nestle-200g-tp-levissimo/p'],['CREME DE LEITE NESTLE TRAD LT 300G','https://www.superpaguemenos.com.br/creme-de-leite-nestle-300g/p'],['CREME DE LEITE SHEFA TP 200ML','https://www.superpaguemenos.com.br/creme-de-leite-shefa-200g/p'],['DESINFETANTE PINHO SOL LAVANDA 500ML','https://www.superpaguemenos.com.br/desinfetante-pinho-sol-lavanda-500ml/p'],['DESINFETANTE PINHO SOL LIMAO TODOS 500ML','https://www.superpaguemenos.com.br/desinfetante-pinho-sol-lavanda-500ml/p'],['DESINFETANTE PINHO SOL ORIGINAL 500ML','https://www.superpaguemenos.com.br/desinfetante-pinho-sol-lavanda-500ml/p'],['DESODORANTE NIVEA AERO MAS BLAC&WHI FRESH 150ML','https://www.superpaguemenos.com.br/nivea-desodorante-antitranspirante-aerosol-invisible-black-white-fresh-150ml/p'],['DESODORANTE NIVEA AERO MASCULINO BLACK WHITE 150ML','https://www.superpaguemenos.com.br/nivea-desodorante-antitranspirante-aerosol-invisible-black-white-fresh-150ml/p'],['DESODORANTE NIVEA AERO MEN DEEP CITRUS 150ML','https://www.superpaguemenos.com.br/nivea-desodorante-antitranspirante-aerosol-invisible-black-white-fresh-150ml/p'],['DESODORANTE NIVEA AERO MEN DRY IMPACT 150ML','https://www.superpaguemenos.com.br/nivea-desodorante-antitranspirante-aerosol-invisible-black-white-fresh-150ml/p'],['DESODORANTE NIVEA AERO MEN FRESH ACTIVE 150ML','https://www.superpaguemenos.com.br/nivea-desodorante-antitranspirante-aerosol-invisible-black-white-fresh-150ml/p'],['DETERGENTE LIMPOL COCO 500mL','https://www.superpaguemenos.com.br/detergente-ype-coco-500ml/p'],['DOCERIA BEIJINHO MOCA NESTLE LT 365g','0'],['ENERGETICO ENERGY MONSTER ULTRA 473ml','https://www.superpaguemenos.com.br/energetico-monster-energy-473ml/p'],['ENERGETICO RED BULL 250ML','https://www.superpaguemenos.com.br/energetico-red-bull-energy-drink-250/p'],['ENERGETICO RED BULL MORANGO 250ML','https://www.superpaguemenos.com.br/energetico-red-bull-energy-drink-250/p'],['ENERGETICO RED BULL SUMMER EDITION MELANCIA 250ml','https://www.superpaguemenos.com.br/energetico-red-bull-energy-drink-250/p'],['ENERGETICO RED BULL SUMMER EDITION PITAYA 250ml','https://www.superpaguemenos.com.br/energetico-red-bull-energy-drink-250/p'],['FEIJAO BROTO LEGAL CARIOCA  1kg','https://www.superpaguemenos.com.br/feijao-carioca-broto-legal-1kg/p'],['GATORADE FRUTAS CITRICAS 500ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GATORADE LARANJA 500ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GATORADE LIMAO 500ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GATORADE MARACUJA 500ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GATORADE MORANGO E MARACUJA 500ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GATORADE TANGERINA 500ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GATORADE UVA 500 ML','https://www.superpaguemenos.com.br/isotonico-gatorade-laranja-500ml/p'],['GELATINA DR OETKER EM PO ABACAXI 20g','https://www.superpaguemenos.com.br/gelatina-em-po-dr-oetker-abacaxi-20g/p'],['GELATINA DR OETKER EM PO CEREJA 20G','https://www.superpaguemenos.com.br/gelatina-em-po-dr-oetker-abacaxi-20g/p'],['GELATINA DR OETKER EM PO CEREJA/AMOR SILVESTRE 20G','https://www.superpaguemenos.com.br/gelatina-em-po-dr-oetker-abacaxi-20g/p'],['GELATINA DR OETKER EM PO LIMAO SABORES 20G ','https://www.superpaguemenos.com.br/gelatina-em-po-dr-oetker-abacaxi-20g/p'],['GELATINA DR OETKER EM PO MARACUJA 20G ','https://www.superpaguemenos.com.br/gelatina-em-po-dr-oetker-abacaxi-20g/p'],['GELATINA DR OETKER EM PO MORANGO 20G ','https://www.superpaguemenos.com.br/gelatina-em-po-dr-oetker-abacaxi-20g/p'],['GELEIA ST DALFOUR 4FRUTAS 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR AMORA SILV 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR CASSIS 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR CEREJA PRETA 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR CRANBERRY 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR DAMASCO 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR FIGO 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR FRAMBOESA 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR LARANJA 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR MAC/CAN 284g','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR MORANGO 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GELEIA ST DALFOUR MYRTILLES 284G','https://www.superpaguemenos.com.br/geleia-st-dalfour-morango-284g/p'],['GUARDANAPO PAPEL SCOTT 24X21,8 DIA A DIA 50UN ','0'],['IOG ANNORA YOUR GUT MORANGO 170g','0'],['IOG ANNORA YOUR GUT ZERO MORANGO 170g','0'],['IOG ATI LATTE AMEIXA/CEREAIS LIGHT 180G','0'],['IOG ATI LATTE COCO 180G','0'],['IOG ATI LATTE COCO LIGHT SABORES 180G','0'],['IOG ATI LATTE DESN C/ MEL 180G','0'],['IOG ATI LATTE MARACUJA SABORES 180G','0'],['IOG ATI LATTE MORANGO 180G','0'],['IOG ATI LATTE MORANGO LIGHT 180G','0'],['IOG ATI LATTE NATURAL BATIDO 180G','0'],['IOG ATI LATTE SKYR MARACUJA 160g','0'],['IOG ATI LATTE SKYR MORANGO SABORES 160g','0'],['IOG ATI LATTE SKYR ORG 160g','0'],['IOG GREGO BLUEBERRY VIGOR 90G','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG NESTLE MORANGO 170G','0'],['IOG NESTLE VIT FRUTA 170G','0'],['IOG VIGOR GREGO FLOCOS TODOS 90G','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO FRUTAS AMARELAS 90G','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO FRUTAS VERMELHAS 90g','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO MARACUJA 90g','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO MOR/BAUN 90g','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO TRAD 90G','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO ULTRA CREMOSO MORANGO 360g','0'],['IOG VIGOR GREGO ZERO MORANGO 90G','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['IOG VIGOR GREGO ZERO TRAD 90G','https://www.superpaguemenos.com.br/iog-grego-vigor-90g-blueberry/p'],['KETCHUP HEINZ MEDIO 397G','https://www.superpaguemenos.com.br/ketchup-heinz-tradicional-397g/p'],['KETCHUP HEINZ PICLES 397g','https://www.superpaguemenos.com.br/ketchup-heinz-picles-397g/p'],['KETCHUP HELLMANNS TRADICIONAL 380G','https://www.superpaguemenos.com.br/catchup-hellmanns-tradicional-380g/p'],['KETCHUP HEMMER TRAD 320G','https://www.superpaguemenos.com.br/ketchup-tradicional-hemmer-320g/p'],['LAVA ROUPAS EM PO MACIEZ TIXAN 800g','https://www.superpaguemenos.com.br/lava-roupa-tixan-800g-conc-maciez/p'],['LAVA ROUPAS EM PO PRIMAVERA TIXAN 800GR','https://www.superpaguemenos.com.br/lava-roupa-tixan-800g-conc-primavera/p'],['LEITE CONDENSADO MOCA NESTLE SEMI DESNATADO TP395G','https://www.superpaguemenos.com.br/leite-condensado-moca-395g/p'],['LEITE CONDENSADO PIRACANJUBA 395G','https://www.superpaguemenos.com.br/leite-condensado-piracanjuba-395g/p'],['LEITE T-A FAZENDA DESNATADO 1L','0'],['LEITE T-A FAZENDA INTEGRAL 1L','0'],['LEITE T-A FAZENDA MAGRO 1L','0'],['LEITE T-A FAZENDA ZERO LACTOSE 1L','0'],['LEITE T-A LETTI  INTEGRAL 1L','0'],['LYSOFORM ORIGINAL 1L','https://www.superpaguemenos.com.br/desinfetante-lysoform-bruto-1l/p'],['MACAR BARILLA BAVETTE 13 500G','https://www.superpaguemenos.com.br/macarrao-grano-duro-barilla-bavette-500g/p'],['MACAR BARILLA CAPELLINI N1 500G','https://www.superpaguemenos.com.br/macarrao-grano-duro-barilla-bavette-500g/p'],['MACAR BARILLA SPAGHETTI-5 500G','https://www.superpaguemenos.com.br/macarrao-grano-duro-barilla-bavette-500g/p'],['MACAR BARILLA SPAGHETTINI-3 500G','https://www.superpaguemenos.com.br/macarrao-grano-duro-barilla-bavette-500g/p'],['MACAR BARILLA SPAGHETTONI 7 500G','https://www.superpaguemenos.com.br/macarrao-grano-duro-barilla-bavette-500g/p'],['MANTEIGA AVIACAO TABL C/SAL 200G','https://www.superpaguemenos.com.br/manteiga-aviacao-com-sal-200g/p'],['MANTEIGA C/SAL TABL XANDO 200G','0'],['MANTEIGA ITAMBE EXTRA C/SAL TABL 200G','0'],['MANTEIGA ITAMBE EXTRA S/SAL 200G','0'],['MANTEIGA RELIQUIA C/SAL PT 200g','0'],['MANTEIGA S/SAL TABL XANDO 200G','0'],['MANTEIGA SERENISSIMA EXTRA C/SAL 200G','0'],['MANTEIGA TEIXEIRA C/SAL 200G','0'],['MANTEIGA TEIXEIRA TABLETE  C/SAL 200g','0'],['MANTEIGA TEIXEIRA TABLETE  S/SAL 200g','0'],['MARSHMALLOW TORCAO FINI 60G','https://www.superpaguemenos.com.br/marshmallow-fini-200g-torcao/p'],['MINI BROWNIE CHOC M. AMARGO WICKBOLD 150g','0'],['MINI BROWNIE CHOC WICKBOLD LATA 180g','0'],['NISSIN LAMEN DE CAMARAO C/ ALHO SABORES 85G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE CANJA DE GALINHA 75g','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE CARNE 85G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE CARNE C/TOMATE 80G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE GALINHA ','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE GALINHA CAIPIRA 85G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE LEGUMES 85G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN DE PICANHA 90G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN SUAVE T MONICA CARNE 90G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN SUAVE T MONICA GALINHA 90G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN SUAVE T MONICA TOMATE 85G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['NISSIN LAMEN YAKISSOBA TRADIC. 87G','https://www.superpaguemenos.com.br/macarrao-instantaneo-miojo-frango-com-alho-85g/p'],['PAO DE FORMA SEVEN BOYS 450g','https://www.superpaguemenos.com.br/pao-forma-seven-boys-450g/p'],['PAO DE FORMA WICKBOLD CHIA/MACADAMI 400g','https://www.superpaguemenos.com.br/pao-de-forma-wickbold-chiamacadamia-400g/p'],['PAO PANCO EGG SPONGE 250G','https://www.superpaguemenos.com.br/pao-panco-egg-esponje-250g/p'],['PAO PULLMAN ARTESANO 500G','https://www.superpaguemenos.com.br/pao-de-forma-pullman-artesano-500g/p'],['PAO PULLMAN ARTESANO PAO NA CHAPA 500g','https://www.superpaguemenos.com.br/pao-pullman-500g-artesano-chapa/p'],['PAO PULLMAN BRIOCHE GRAND BURGER 520g','https://www.superpaguemenos.com.br/pao-hamburguer-pullman-520g-brioche/p'],['PAO PULLMAN GRAOS E CASTANHAS 450g','https://www.superpaguemenos.com.br/pao-de-forma-pullman-12-graos-100-integral-450g/p'],['PAO PULLMAN INTEG 12 GRAOS 350G','https://www.superpaguemenos.com.br/pao-de-forma-pullman-fit-12-graos-350g/p'],['PAO WICK ESP GRAO SABOR CAST/QUINOA QUAD 400G ','https://www.superpaguemenos.com.br/pao-de-forma-wickbold-castanha-do-paraquinoa-400g/p'],['PAPEL HIGIENICO NEVE 20M C/12UN','https://www.superpaguemenos.com.br/papel-hig-neve-c12-l12-p11-fd/p'],['PAPEL HIGIENICO NEVE NEUTRO BCO 4X30M','https://www.superpaguemenos.com.br/papel-higienico-neve-folha-dupla-30m-com-4-unidades/p'],['PAPEL HIGIENICO NEVE NEUTRO DERMACARE LV16 P15','https://www.superpaguemenos.com.br/papel-higienico-neve-folha-dupla-30m-leve-18-pague-16/p'],['PAPEL HIGIENICO NEVE NEUTRO DERMACARE LV24 P21','https://www.superpaguemenos.com.br/papel-higienico-neve-folha-dupla-30m-leve-24-pague-21/p'],['PAPEL HIGIENICO NEVE SUPREME C/12','https://www.superpaguemenos.com.br/papel-hig-neve-c12-l12-p11-ft/p'],['POLPA DE FRUTA DM ABACAXI 100G','https://www.superpaguemenos.com.br/polpa-de-marchi-abacaxi-100g/p'],['POLPA DE FRUTA DM ABACAXI/HORTELA 100G','https://www.superpaguemenos.com.br/polpa-de-marchi-abacaxi-com-hortela-100g/p'],['POLPA DE FRUTA DM GOIABA 100G','0'],['POLPA DE FRUTA DM MANGA 100G','0'],['POLPA DE FRUTA DM MORANGO 100G','https://www.superpaguemenos.com.br/polpa-de-marchi-morango-100g/p'],['POLPA DE FRUTA DM TAMARINDO 100G','0'],['POLPA DE FRUTA DM TANGERINA 100G','0'],['POLPA DM CLOROFILA 100G','0'],['REFRIGERANTE COCA COLA PET 1,5L','https://www.superpaguemenos.com.br/refrigerante-coca-cola-15l/p'],['REFRIGERANTE COCA COLA PET 200mL','https://www.superpaguemenos.com.br/refrigerante-coca-cola-200ml/p'],['REFRIGERANTE COCA COLA ZERO PET 1,5L','https://www.superpaguemenos.com.br/refrigerante-coca-cola-zero-acucar-15l/p'],['REFRIGERANTE FANTA LARANJA LATA 350ML ','https://www.superpaguemenos.com.br/refrigerante-fanta-laranja-350ml/p'],['REFRIGERANTE GUAR ANTARCTICA ZERO LATA 350ML ','https://www.superpaguemenos.com.br/refrigerante-antarctica-guarana-diet-350ml/p'],['REFRIGERANTE GUAR ANTARCTICA ZERO PET 2L','https://www.superpaguemenos.com.br/refrigerante-antarctica-guarana-zero-2l/p'],['REFRIGERANTE GUARANA ANTARCTICA LATA 269ml','0'],['REFRIGERANTE GUARANA ANTARCTICA LATA 350mL','https://www.superpaguemenos.com.br/refrigerante-antarctica-guarana-350ml/p'],['REFRIGERANTE H2OH LIMAO 1,5L','https://www.superpaguemenos.com.br/refrigerante-h2oh-limao-15l/p'],['REFRIGERANTE H2OH LIMAO 500ML','https://www.superpaguemenos.com.br/refrigerante-h2oh-limao-500ml/p'],['REFRIGERANTE H2OH LIMONETO 1,5L','https://www.superpaguemenos.com.br/refrigerante-h2oh-limoneto-15l/p'],['REFRIGERANTE H2OH LIMONETO 500ML','https://www.superpaguemenos.com.br/refrigerante-h2oh-limoneto-500ml/p'],['REFRIGERANTE SPRITE LATA S/ACUCAR 350ml','https://www.superpaguemenos.com.br/refrigerante-sprite-original-350ml/p'],['REQUEIJAO CRIOULO TRAD 220g','https://www.superpaguemenos.com.br/requeijao-crioulo-220g-cremoso/p'],['SABAO EM PO LAVAGEM PERFEITA OMO 1,6kg','https://www.superpaguemenos.com.br/sabao-em-po-omo-lavagem-perfeita-16kg/p'],['SABAO EM PO PROTECAO MICELAR S/ PERFUME OMO 800g','0'],['SALSICHA SADIA HOT DOG 500G','https://www.superpaguemenos.com.br/salsicha-sadia-hot-dog-500g/p'],['SUCO DEL VALLE MAIS ABACAXI 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO DEL VALLE MAIS CAJU 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO DEL VALLE MAIS LARANJA 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO DEL VALLE MAIS MANGA TP 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO DEL VALLE MAIS MARACUJA TP 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO DEL VALLE MAIS PESSEGO 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO DEL VALLE MAIS UVA 1L','https://www.superpaguemenos.com.br/suco-nectar-del-valle-mais-abacaxi-1l/p'],['SUCO KAPO ABACAXI 200ML','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['SUCO KAPO FRUTAS CITRICAS 200ML','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['SUCO KAPO LARANJA 200ML','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['SUCO KAPO MARACUJA 200ML','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['SUCO KAPO MORANGO 200ML','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['SUCO KAPO UVA 200ML','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['SUCO SUFRESH ABACAXI 1L','https://www.superpaguemenos.com.br/suco-kapo-abacaxi-200ml/p'],['TAPIOCA AKIO 500G','https://www.superpaguemenos.com.br/goma-para-tapioca-akio-hidratante-500g/p'],['TAPIOCA DA TERRINHA 500G','0'],['TORRADA BAUDUCCO LEVEM SALGADA 142G','https://www.superpaguemenos.com.br/torrada-bauducco-142g-integral/p'],['TUBINHO MORANGO ACIDO FINI 80G','https://www.superpaguemenos.com.br/bala-gelatina-fini-tubinho-doce-80g/p'],['TUBINHO MORANGO DOCE FINI 80G','https://www.superpaguemenos.com.br/bala-gelatina-fini-tubinho-doce-80g/p'],['VINAGRE CASTELO CLASSICO TINTO 750ML ','https://www.superpaguemenos.com.br/vinagre-de-vinho-tinto-castelo-750ml/p'],['VINAGRE CASTELO DE ALCOOL 750ML ','https://www.superpaguemenos.com.br/vinagre-de-alcool-castelo-750ml/p'],['VINAGRE CASTELO DE MACA 750ML ','https://www.superpaguemenos.com.br/vinagre-de-maca-castelo-750ml/p'],['VINHO ARG CONCHA Y TORO MALBEC 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-reservado-malbec-750ml/p'],['VINHO CHI CONCHA Y TORO RESER CAB. SAUVIGNON 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-reservado-malbec-750ml/p'],['VINHO CHI CONCHA Y TORO RESERVADO CARMENERE 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-reservado-malbec-750ml/p'],['VINHO CHI CONCHA Y TORO RESERVADO MERLOT 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-reservado-malbec-750ml/p'],['VINHO CHI CONCHA Y TORO RESERVADO SAUV BLANC','https://www.superpaguemenos.com.br/vinho-chileno-tinto-reservado-malbec-750ml/p'],['VINHO CHI STA HELENA CAB MERLOT TTO 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-santa-helena-reservado-merlot-750ml/p'],['VINHO CHI STA HELENA CAB SAUV TTO 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-santa-helena-reservado-merlot-750ml/p'],['VINHO CHI STA HELENA CHARDONNAY BCO 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-santa-helena-reservado-merlot-750ml/p'],['VINHO CHI STA HELENA RES CARMENERE TTO 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-santa-helena-reservado-merlot-750ml/p'],['VINHO CHI STA HELENA RES MERLOT TTO 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-santa-helena-reservado-merlot-750ml/p'],['VINHO CHI STA HELENA RES SAUVIGN BLANC 750ml','https://www.superpaguemenos.com.br/vinho-chileno-tinto-santa-helena-reservado-merlot-750ml/p'],['WHISKY CHIVAS REGAL 1L ','https://www.superpaguemenos.com.br/whisky-escoces-chivas-regal-12-anos-1l/p'],['WHISKY JOHNNIE WALKER BLACK LABEL 1L','https://www.superpaguemenos.com.br/whisky-escoces-johnnie-walker-black-label-1l/p'],['WHISKY JOHNNIE WALKER RED LABEL 1L','https://www.superpaguemenos.com.br/whisky-escoces-johnnie-walker-red-label-1l/p'],['YAKULT 40 480G C/6 ','https://www.superpaguemenos.com.br/leite-fermentado-yakult-com-6-unidades/p']]
async function getPrices(){
  for(i in urlPgmenos){
    await axios.get(urlPgmenos[i][1]).then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      const container = $('.box-pricing')
      const price = $(container).find('.price_off').text()
      console.log(urlPgmenos[i][0] + ': R$: ' + price)
    }).catch((error)=>{
      console.log(urlPgmenos[i][0] + ': Não encontrado')
    })
  }
}

getPrices()