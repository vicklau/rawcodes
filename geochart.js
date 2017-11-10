var selectedGroup = ['H', 'K', 'N', 'R'];

google.charts.load('current', {
    'packages': ['geochart', 'table'],
    // mapsApiKey - from https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyBlgHwWTk4r3hyRemDt69W_jaMaknFhye4'
});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.arrayToDataTable(
        [
            [{ label: 'Constituency', type: 'string' },
                { label: 'ID', type: 'string', role: 'tooltip' },
                { label: 'Population', type: 'number', role: 'data' },
                { label: 'Group', type: 'string', role: 'annotation' }
            ],
            ['Chung Wan 中環', 'A01', 12382, 'H'],
            ['Mid Levels East 半山東', 'A02', 16764, 'H'],
            ['Castle Road 衛城', 'A03', 19707, 'H'],
            ['Peak 山頂', 'A04', 20043, 'H'],
            ['University 大學', 'A05', 17700, 'H'],
            ['Kennedy Town & Mount Davis 堅摩', 'A06', 16882, 'H'],
            ['Kwun Lung 觀龍', 'A07', 15231, 'H'],
            ['Sai Wan 西環', 'A08', 14241, 'H'],
            ['Belcher 寶翠', 'A09', 20885, 'H'],
            ['Shek Tong Tsui 石塘咀', 'A10', 17299, 'H'],
            ['Sai Ying Pun 西營盤', 'A11', 14253, 'H'],
            ['Sheung Wan 上環', 'A12', 13737, 'H'],
            ['Tung Wah 東華', 'A13', 11748, 'H'],
            ['Centre Street 正街', 'A14', 13930, 'H'],
            ['Water Street 水街', 'A15', 14783, 'H'],
            ['Hennessy 軒尼詩', 'B01', 12646, 'H'],
            ['Oi Kwan 愛群', 'B02', 12989, 'H'],
            ['Canal Road 鵝頸', 'B03', 12022, 'H'],
            ['Victoria Park 維園', 'B04', 14046, 'H'],
            ['Tin Hau 天后', 'B05', 14928, 'H'],
            ['Causeway Bay 銅鑼灣', 'B06', 11103, 'H'],
            ['Tai Hang 大坑', 'B07', 14133, 'H'],
            ['Jardines Lookout 渣甸山', 'B08', 16340, 'H'],
            ['Broadwood 樂活', 'B09', 15564, 'H'],
            ['Happy Valley 跑馬地', 'B10', 12494, 'H'],
            ['Stubbs Road 司徒拔道', 'B11', 14508, 'H'],
            ['Southorn 修頓', 'B12', 14303, 'H'],
            ['Tai Fat Hau 大佛口', 'B13', 12329, 'H'],
            ['Tai Koo Shing West 太古城西', 'C01', 17846, 'H'],
            ['Tai Koo Shing East 太古城東', 'C02', 17779, 'H'],
            ['Lei King Wan 鯉景灣', 'C03', 21390, 'H'],
            ['Aldrich Bay 愛秩序灣', 'C04', 17206, 'H'],
            ['Shaukeiwan 筲箕灣', 'C05', 12988, 'H'],
            ['A Kung Ngam 阿公岩', 'C06', 18196, 'H'],
            ['Heng Fa Chuen 杏花邨', 'C07', 18699, 'H'],
            ['Tsui Wan 翠灣', 'C08', 12134, 'H'],
            ['Yan Lam 欣藍', 'C09', 16312, 'H'],
            ['Siu Sai Wan 小西灣', 'C10', 12907, 'H'],
            ['King Yee 景怡', 'C11', 14624, 'H'],
            ['Wan Tsui 環翠', 'C12', 14862, 'H'],
            ['Fei Tsui 翡翠', 'C13', 14734, 'H'],
            ['Mount Parker 柏架山', 'C14', 13243, 'H'],
            ['Braemar Hill 寶馬山', 'C15', 16729, 'H'],
            ['Fortress Hill 炮台山', 'C16', 16114, 'H'],
            ['City Garden 城市花園', 'C17', 16710, 'H'],
            ['Provident 和富', 'C18', 21436, 'H'],
            ['Fort Street 堡壘', 'C19', 15768, 'H'],
            ['Kam Ping 錦屏', 'C20', 16512, 'H'],
            ['Tanner 丹拿', 'C21', 14269, 'H'],
            ['Healthy Village 健康村', 'C22', 13437, 'H'],
            ['Quarry Bay 鰂魚涌', 'C23', 13060, 'H'],
            ['Nam Fung 南豐', 'C24', 13982, 'H'],
            ['Kornhill 康怡', 'C25', 15100, 'H'],
            ['Kornhill Garden 康山', 'C26', 13712, 'H'],
            ['Hing Tung 興東', 'C27', 18201, 'H'],
            ['Sai Wan Ho 西灣河', 'C28', 19576, 'H'],
            ['Lower Yiu Tung 下耀東', 'C29', 18875, 'H'],
            ['Upper Yiu Tung 上耀東', 'C30', 12033, 'H'],
            ['Hing Man 興民', 'C31', 14429, 'H'],
            ['Lok Hong 樂康', 'C32', 11467, 'H'],
            ['Tsui Tak 翠德', 'C33', 12458, 'H'],
            ['Yue Wan 漁灣', 'C34', 14483, 'H'],
            ['Kai Hiu 佳曉', 'C35', 13403, 'H'],
            ['Aberdeen  香港仔', 'D01', 19399, 'H'],
            ['Ap Lei Chau Estate 鴨脷洲邨', 'D02', 14521, 'H'],
            ['Ap Lei Chau North 鴨脷洲北', 'D03', 12596, 'H'],
            ['Lei Tung I 利東一', 'D04', 15460, 'H'],
            ['Lei Tung II 利東二', 'D05', 11548, 'H'],
            ['South Horizons East 海怡東', 'D06', 15115, 'H'],
            ['South Horizons West 海怡西', 'D07', 15618, 'H'],
            ['Wah Kwai 華貴', 'D08', 13456, 'H'],
            ['Wah Fu South 華富南', 'D09', 13427, 'H'],
            ['Wah Fu North 華富北', 'D10', 14017, 'H'],
            ['Pokfulam 薄扶林', 'D11', 19696, 'H'],
            ['Chi Fu 置富', 'D12', 15544, 'H'],
            ['Tin Wan 田灣', 'D13', 17157, 'H'],
            ['Shek Yue 石漁', 'D14', 15919, 'H'],
            ['Wong Chuk Hang  黃竹坑', 'D15', 18614, 'H'],
            ['Bays Area 海灣', 'D16', 18294, 'H'],
            ['Stanley & Shek O 赤柱及石澳', 'D17', 19632, 'H'],
            ['Tsim Sha Tsui West 尖沙咀西', 'E01', 20852, 'K'],
            ['Jordan South 佐敦南', 'E02', 18349, 'K'],
            ['Jordan West 佐敦西', 'E03', 18036, 'K'],
            ['Yau Ma Tei South 油麻地南', 'E04', 20680, 'K'],
            ['Charming  富榮', 'E05', 16961, 'K'],
            ['Mong Kok West 旺角西', 'E06', 16512, 'K'],
            ['Fu Pak 富柏', 'E07', 19919, 'K'],
            ['Olympic 奧運', 'E08', 17543, 'K'],
            ['Cherry 櫻桃', 'E09', 13938, 'K'],
            ['Tai Kok Tsui South 大角咀南', 'E10', 15571, 'K'],
            ['Tai Kok Tsui North 大角咀北', 'E11', 19927, 'K'],
            ['Tai Nan 大南', 'E12', 22403, 'K'],
            ['Mong Kok North 旺角北', 'E13', 19162, 'K'],
            ['Mong Kok East 旺角東', 'E14', 16960, 'K'],
            ['Mong Kok South 旺角南', 'E15', 16353, 'K'],
            ['Yau Ma Tei North 油麻地北', 'E16', 12914, 'K'],
            ['East Tsim Sha Tsui & King’s Park 尖東及京士柏', 'E17', 15824, 'K'],
            ['Tsim Sha Tsui Central 尖沙咀中', 'E18', 16749, 'K'],
            ['Jordan North 佐敦北', 'E19', 18308, 'K'],
            ['Po Lai 寶麗', 'F01', 18825, 'K'],
            ['Cheung Sha Wan 長沙灣', 'F02', 15471, 'K'],
            ['Nam Cheong North 南昌北', 'F03', 22773, 'K'],
            ['Shek Kip Mei 石硤尾', 'F04', 20741, 'K'],
            ['Nam Cheong East 南昌東', 'F05', 20929, 'K'],
            ['Nam Cheong South 南昌南', 'F06', 22267, 'K'],
            ['Nam Cheong Central 南昌中', 'F07', 20896, 'K'],
            ['Nam Cheong West 南昌西', 'F08', 18976, 'K'],
            ['Fu Cheong 富昌', 'F09', 18509, 'K'],
            ['Lai Kok 麗閣', 'F10', 13310, 'K'],
            ['Fortune 幸福', 'F11', 15928, 'K'],
            ['Lai Chi Kok South 荔枝角南', 'F12', 17013, 'K'],
            ['Mei Foo South 美孚南', 'F13', 17247, 'K'],
            ['Mei Foo Central 美孚中', 'F14', 12774, 'K'],
            ['Mei Foo North 美孚北', 'F15', 15665, 'K'],
            ['Lai Chi Kok Central 荔枝角中', 'F16', 19052, 'K'],
            ['Lai Chi Kok North 荔枝角北', 'F17', 14602, 'K'],
            ['Un Chau & So Uk 元州及蘇屋', 'F18', 18583, 'K'],
            ['Lei Cheng Uk 李鄭屋', 'F19', 12199, 'K'],
            ['Ha Pak Tin 下白田', 'F20', 16437, 'K'],
            ['Yau Yat Tsuen 又一村', 'F21', 14795, 'K'],
            ['Nam Shan}, {v: Tai Hang Tung & Tai Hang Sai 南山、大坑東及大坑西', 'F22', 14577, 'K'],
            ['Lung Ping & Sheung Pak Tin 龍坪及上白田', 'F23', 15961, 'K'],
            ['Ma Tau Wai 馬頭圍', 'G01', 19706, 'K'],
            ['Ma Hang Chung 馬坑涌', 'G02', 20006, 'K'],
            ['Ma Tau Kok 馬頭角', 'G03', 15209, 'K'],
            ['Lok Man 樂民', 'G04', 15578, 'K'],
            ['Sheung Lok 常樂', 'G05', 15177, 'K'],
            ['Ho Man Tin 何文田', 'G06', 20211, 'K'],
            ['Kadoorie 嘉道理', 'G07', 18491, 'K'],
            ['Prince 太子', 'G08', 15663, 'K'],
            ['Kowloon Tong 九龍塘', 'G09', 20637, 'K'],
            ['Lung Shing 龍城', 'G10', 15009, 'K'],
            ['Sung Wong Toi 宋皇臺', 'G11', 21424, 'K'],
            ['Kai Tak North 啓德北', 'G12', 15930, 'K'],
            ['Kai Tak South 啓德南', 'G13', 14495, 'K'],
            ['Hoi Sham 海心', 'G14', 15409, 'K'],
            ['To Kwa Wan North 土瓜灣北', 'G15', 15451, 'K'],
            ['To Kwa Wan South 土瓜灣南', 'G16', 14507, 'K'],
            ['Hok Yuen Laguna Verde 鶴園海逸', 'G17', 18973, 'K'],
            ['Whampoa East 黃埔東', 'G18', 17459, 'K'],
            ['Whampoa West 黃埔西', 'G19', 21394, 'K'],
            ['Hung Hom Bay 紅磡灣', 'G20', 18431, 'K'],
            ['Hung Hom  紅磡', 'G21', 14074, 'K'],
            ['Ka Wai 家維', 'G22', 19375, 'K'],
            ['Oi Man 愛民', 'G23', 14442, 'K'],
            ['Oi Chun 愛俊', 'G24', 13198, 'K'],
            ['Lung Tsui 龍趣', 'H01', 16220, 'K'],
            ['Lung Ha 龍下', 'H02', 11589, 'K'],
            ['Lung Sheung  龍上', 'H03', 19725, 'K'],
            ['Fung Wong 鳳凰', 'H04', 14595, 'K'],
            ['Fung Tak 鳳德', 'H05', 15046, 'K'],
            ['Lung Sing 龍星', 'H06', 19231, 'K'],
            ['San Po Kong 新蒲崗', 'H07', 23345, 'K'],
            ['Tung Tau 東頭', 'H08', 16615, 'K'],
            ['Tung Mei 東美', 'H09', 16135, 'K'],
            ['Lok Fu 樂富', 'H10', 14217, 'K'],
            ['Wang Tau Hom 橫頭磡', 'H11', 17104, 'K'],
            ['Tin Keung 天強', 'H12', 13616, 'K'],
            ['Tsui Chuk & Pang Ching 翠竹及鵬程', 'H13', 17890, 'K'],
            ['Chuk Yuen South 竹園南', 'H14', 15320, 'K'],
            ['Chuk Yuen North 竹園北', 'H15', 15034, 'K'],
            ['Tsz Wan West 慈雲西', 'H16', 19731, 'K'],
            ['Ching Oi 正愛', 'H17', 20465, 'K'],
            ['Ching On 正安', 'H18', 22299, 'K'],
            ['Tsz Wan East 慈雲東', 'H19', 20532, 'K'],
            ['King Fu 瓊富', 'H20', 18481, 'K'],
            ['Choi Wan East 彩雲東', 'H21', 14220, 'K'],
            ['Choi Wan South 彩雲南', 'H22', 12577, 'K'],
            ['Choi Wan West 彩雲西', 'H23', 13567, 'K'],
            ['Chi Choi 池彩', 'H24', 15452, 'K'],
            ['Choi Hung 彩虹', 'H25', 14938, 'K'],
            ['Kwun Tong Central 觀塘中心', 'J01', 15041, 'K'],
            ['Kowloon Bay 九龍灣', 'J02', 12629, 'K'],
            ['Kai Yip 啓業', 'J03', 14860, 'K'],
            ['Lai Ching 麗晶', 'J04', 14737, 'K'],
            ['Ping Shek 坪石', 'J05', 13041, 'K'],
            ['Sheung Choi 雙彩', 'J06', 21699, 'K'],
            ['Jordan Valley 佐敦谷', 'J07', 20031, 'K'],
            ['Shun Tin 順天', 'J08', 18247, 'K'],
            ['Sheung Shun 雙順', 'J09', 17480, 'K'],
            ['On Lee 安利', 'J10', 14346, 'K'],
            ['Po Tat 寶達', 'J11', 22124, 'K'],
            ['Sau Mau Ping North 秀茂坪北', 'J12', 20299, 'K'],
            ['Hiu Lai 曉麗', 'J13', 16780, 'K'],
            ['Sau Mau Ping South 秀茂坪南', 'J14', 15239, 'K'],
            ['Sau Mau Ping Central 秀茂坪中', 'J15', 16713, 'K'],
            ['Hing Tin 興田', 'J16', 16912, 'K'],
            ['Lam Tin 藍田', 'J17', 21714, 'K'],
            ['Kwong Tak 廣德', 'J18', 18746, 'K'],
            ['Ping Tin 平田', 'J19', 16178, 'K'],
            ['Pak Nga 栢雅', 'J20', 12666, 'K'],
            ['Yau Tong East 油塘東', 'J21', 21017, 'K'],
            ['Yau Lai 油麗', 'J22', 20429, 'K'],
            ['Chui Cheung 翠翔', 'J23', 22535, 'K'],
            ['Yau Tong West 油塘西', 'J24', 18899, 'K'],
            ['Laguna City 麗港城', 'J25', 25663, 'K'],
            ['King Tin 景田', 'J26', 19714, 'K'],
            ['Tsui Ping 翠屏', 'J27', 18331, 'K'],
            ['Po Lok 寶樂', 'J28', 13945, 'K'],
            ['Yuet Wah 月華', 'J29', 13358, 'K'],
            ['Hip Hong 協康', 'J30', 16341, 'K'],
            ['Hong Lok 康樂', 'J31', 15697, 'K'],
            ['Ting On 定安', 'J32', 17426, 'K'],
            ['Upper Ngau Tau Kok Estate 牛頭角上邨', 'J33', 15123, 'K'],
            ['Lower Ngau Tau Kok Estate 牛頭角下邨', 'J34', 16701, 'K'],
            ['To Tai  淘大', 'J35', 16671, 'K'],
            ['Lok Wah North 樂華北', 'J36', 12606, 'K'],
            ['Lok Wah South 樂華南', 'J37', 12759, 'K'],
            ['Tak Wah 德華', 'K01', 21559, 'N'],
            ['Yeung Uk Road 楊屋道', 'K02', 23398, 'N'],
            ['Hoi Bun 海濱', 'K03', 19438, 'N'],
            ['Clague Garden 祈德尊', 'K04', 16636, 'N'],
            ['Fuk Loi 福來', 'K05', 14282, 'N'],
            ['Discovery Park 愉景', 'K06', 16493, 'N'],
            ['Tsuen Wan Centre 荃灣中心', 'K07', 15318, 'N'],
            ['Allway 荃威', 'K08', 19881, 'N'],
            ['Lai To 麗濤', 'K09', 18815, 'N'],
            ['Tsuen Wan West 荃灣西', 'K11', 19615, 'N'],
            ['Ma Wan 馬灣', 'K13', 14450, 'N'],
            ['Luk Yeung 綠楊', 'K14', 14268, 'N'],
            ['Lei Muk Shue East 梨木樹東', 'K15', 17267, 'N'],
            ['Lei Muk Shue West 梨木樹西', 'K16', 17924, 'N'],
            ['Shek Wai Kok 石圍角', 'K17', 13288, 'N'],
            ['Cheung Shek 象石', 'K18', 12663, 'N'],
            ['Tuen Mun Town Centre 屯門市中心', 'L01', 21043, 'N'],
            ['Siu Chi  兆置', 'L02', 19471, 'N'],
            ['Siu Tsui 兆翠', 'L03', 18463, 'N'],
            ['On Ting 安定', 'L04', 16587, 'N'],
            ['Yau Oi South 友愛南', 'L05', 15241, 'N'],
            ['Yau Oi North 友愛北', 'L06', 14872, 'N'],
            ['Tsui Hing 翠興', 'L07', 18475, 'N'],
            ['Shan King 山景', 'L08', 16903, 'N'],
            ['Ting Sham 汀深', 'K10', 18321, 'R'],
            ['King Hing 景興', 'L09', 14643, 'N'],
            ['Hing Tsak 興澤', 'L10', 15134, 'N'],
            ['Tsuen Wan Rural 荃灣郊區', 'K12', 19188, 'R'],
            ['Hanford 恆福', 'L13', 20507, 'N'],
            ['Fu Sun 富新', 'L14', 18540, 'N'],
            ['Yuet Wu 悅湖', 'L15', 12907, 'N'],
            ['Siu Hei 兆禧', 'L16', 12313, 'N'],
            ['Wu King 湖景', 'L17', 13873, 'N'],
            ['Butterfly 蝴蝶', 'L18', 16252, 'N'],
            ['Lok Tsui 樂翠', 'L19', 14165, 'N'],
            ['Lung Mun 龍門', 'L20', 16606, 'N'],
            ['San King 新景', 'L21', 13778, 'N'],
            ['Leung King 良景', 'L22', 13052, 'N'],
            ['Tin King 田景', 'L23', 15165, 'N'],
            ['Po Tin 寶田', 'L24', 17395, 'N'],
            ['Kin Sang 建生', 'L25', 14902, 'N'],
            ['Siu Hong 兆康', 'L26', 14808, 'N'],
            ['Prime View 景峰', 'L27', 18688, 'N'],
            ['Fu Tai 富泰', 'L28', 18756, 'N'],
            ['Fung Nin 豐年', 'M01', 18477, 'N'],
            ['Shui Pin 水邊', 'M02', 20173, 'N'],
            ['San Hui 新墟', 'L11', 18960, 'R'],
            ['Nam Ping 南屏', 'M03', 15995, 'N'],
            ['Sam Shing 三聖', 'L12', 21629, 'R'],
            ['Pek Long 北朗', 'M04', 16381, 'N'],
            ['Yuen Long Centre 元朗中心', 'M05', 16584, 'N'],
            ['Yuen Lung 元龍', 'M06', 14031, 'N'],
            ['Fung Cheung 鳳翔', 'M07', 15911, 'N'],
            ['Ping Shan North 屏山北', 'M13', 12889, 'N'],
            ['Tin Shing 天盛', 'M15', 20596, 'N'],
            ['Shui Oi 瑞愛', 'M16', 17566, 'N'],
            ['Shui Wah 瑞華', 'M17', 15037, 'N'],
            ['Chung Wah 頌華', 'M18', 16279, 'N'],
            ['Yuet Yan 悅恩', 'M19', 18757, 'N'],
            ['Fu Yan 富恩', 'M20', 18948, 'N'],
            ['Yat Chak 逸澤', 'M21', 20681, 'N'],
            ['Tin Heng 天恒', 'M22', 20836, 'N'],
            ['Wang Yat 宏逸', 'M23', 18406, 'N'],
            ['Ching King 晴景', 'M24', 18960, 'N'],
            ['Kingswood North 嘉湖北', 'M25', 22298, 'N'],
            ['Tsz Yau 慈祐', 'M26', 14455, 'N'],
            ['Tuen Mun Rural 屯門鄉郊', 'L29', 19405, 'R'],
            ['Yiu Yau 耀祐', 'M27', 14033, 'N'],
            ['Tin Yiu 天耀', 'M28', 12484, 'N'],
            ['Kingswood South 嘉湖南', 'M29', 17076, 'N'],
            ['Chung Pak 頌栢', 'M30', 15391, 'N'],
            ['Fairview Park 錦綉花園', 'M31', 15351, 'N'],
            ['Fanling Town 粉嶺市', 'N02', 13895, 'N'],
            ['Cheung Wah 祥華', 'N03', 16062, 'N'],
            ['Wah Do 華都', 'N04', 18130, 'N'],
            ['Wah Ming 華明', 'N05', 15817, 'N'],
            ['Shap Pat Heung East 十八鄉東', 'M08', 14975, 'R'],
            ['Yan Shing 欣盛', 'N06', 18945, 'N'],
            ['Shap Pat Heung Central 十八鄉中', 'M09', 20353, 'R'],
            ['Shing Fuk 盛福', 'N07', 14618, 'N'],
            ['Shap Pat Heung West 十八鄉西', 'M10', 19890, 'R'],
            ['Fanling South 粉嶺南', 'N08', 14530, 'N'],
            ['Ping Shan South  屏山南', 'M11', 24152, 'R'],
            ['Ching Ho 清河', 'N09', 20292, 'N'],
            ['Ping Shan Central 屏山中', 'M12', 13352, 'R'],
            ['Yu Tai 御太', 'N10', 17545, 'N'],
            ['Choi Yuen  彩園', 'N12', 17444, 'N'],
            ['Ha Tsuen 廈村', 'M14', 14628, 'R'],
            ['Tin Ping West 天平西', 'N14', 14400, 'N'],
            ['Tai Po Hui 大埔墟', 'P01', 19744, 'N'],
            ['Tai Po Central 大埔中', 'P02', 13839, 'N'],
            ['Chung Ting 頌汀', 'P03', 14636, 'N'],
            ['Tai Yuen 大元', 'P04', 14871, 'N'],
            ['Fu Heng 富亨', 'P05', 16001, 'N'],
            ['Yee Fu 怡富', 'P06', 14553, 'N'],
            ['Fu Ming Sun 富明新', 'P07', 13556, 'N'],
            ['Kwong Fuk & Plover Cove 廣福及寶湖', 'P08', 13350, 'N'],
            ['Wang Fuk 宏福', 'P09', 11876, 'N'],
            ['Wan Tau Tong 運頭塘', 'P11', 15272, 'N'],
            ['Po Nga 寶雅', 'P14', 13304, 'N'],
            ['Old Market & Serenity 舊墟及太湖', 'P16', 14580, 'N'],
            ['Hong Lok Yuen 康樂園', 'P17', 22240, 'N'],
            ['Sai Kung North 西貢北', 'P19', 12704, 'N'],
            ['Sai Kung Central 西貢市中心', 'Q01', 9689, 'N'],
            ['San Tin 新田', 'M32', 21565, 'R'],
            ['Kam Tin 錦田', 'M33', 13181, 'R'],
            ['Pat Heung North 八鄉北', 'M34', 10871, 'R'],
            ['Pat Heung South 八鄉南', 'M35', 18700, 'R'],
            ['Kwai Hing 葵興', 'S01', 17683, 'N'],
            ['Kwai Shing East Estate 葵盛東邨', 'S02', 19808, 'N'],
            ['Upper Tai Wo Hau 上大窩口', 'S03', 13651, 'N'],
            ['Lower Tai Wo Hau 下大窩口', 'S04', 13442, 'N'],
            ['Kwai Chung Estate North 葵涌邨北', 'S05', 20248, 'N'],
            ['Kwai Chung Estate South 葵涌邨南', 'S06', 21158, 'N'],
            ['Shek Yam 石蔭', 'S07', 22238, 'N'],
            ['On Yam 安蔭', 'S08', 16188, 'N'],
            ['Shek Lei South 石籬南', 'S09', 19637, 'N'],
            ['Shek Lei North 石籬北', 'S10', 21946, 'N'],
            ['Sha Tin Town Centre 沙田市中心', 'R01', 19142, 'N'],
            ['Tai Pak Tin 大白田', 'S11', 22402, 'R'],
            ['Lek Yuen 瀝源', 'R02', 15665, 'N'],
            ['Kwai Fong 葵芳', 'S12', 18076, 'N'],
            ['Wo Che Estate 禾輋邨', 'R03', 17899, 'N'],
            ['Wah Lai 華麗', 'S13', 17217, 'N'],
            ['City One 第一城', 'R04', 16597, 'N'],
            ['Lai Wah 荔華', 'S14', 15981, 'N'],
            ['Yue Shing 愉城', 'R05', 15606, 'N'],
            ['Cho Yiu 祖堯', 'S15', 15684, 'N'],
            ['Wong Uk 王屋', 'R06', 16482, 'N'],
            ['Hing Fong  興芳', 'S16', 23171, 'N'],
            ['Sha Kok 沙角', 'R07', 16284, 'N'],
            ['Lai King 荔景', 'S17', 14009, 'N'],
            ['Pok Hong 博康', 'R08', 14142, 'N'],
            ['Kwai Shing West Estate 葵盛西邨', 'S18', 17475, 'N'],
            ['Jat Min 乙明', 'R09', 22607, 'N'],
            ['On Ho 安灝', 'S19', 20058, 'N'],
            ['Chun Fung 秦豐', 'R10', 14959, 'N'],
            ['Wai Ying 偉盈', 'S20', 19511, 'N'],
            ['Sun Tin Wai 新田圍', 'R11', 15747, 'N'],
            ['Tsing Yi Estate 青衣邨', 'S21', 14664, 'N'],
            ['Chui Tin 翠田', 'R12', 15355, 'N'],
            ['Greenfield  翠怡', 'S22', 17165, 'N'],
            ['Hin Ka 顯嘉', 'R13', 11958, 'N'],
            ['Cheung Ching 長青', 'S23', 18408, 'N'],
            ['Lower Shing Mun 下城門', 'R14', 18208, 'N'],
            ['Cheung Hong 長康', 'S24', 14059, 'N'],
            ['Wan Shing 雲城', 'R15', 21446, 'N'],
            ['Shing Hong 盛康', 'S25', 15765, 'N'],
            ['Keng Hau 徑口', 'R16', 20777, 'N'],
            ['Tsing Yi South 青衣南', 'S26', 16726, 'N'],
            ['Tin Sum 田心', 'R17', 14746, 'N'],
            ['Cheung Hang 長亨', 'S27', 14012, 'N'],
            ['Chui Ka 翠嘉', 'R18', 16078, 'N'],
            ['Ching Fat 青發', 'S28', 17408, 'N'],
            ['Tai Wai 大圍', 'R19', 19935, 'N'],
            ['Cheung On 長安', 'S29', 12704, 'N'],
            ['Chung Tin 松田', 'R20', 14661, 'N'],
            ['Sui Wo 穗禾', 'R21', 12114, 'N'],
            ['Lantau 大嶼山', 'T01', 20387, 'R'],
            ['Fo Tan 火炭', 'R22', 18455, 'N'],
            ['Yat Tung Estate North 逸東邨北', 'T02', 19899, 'N'],
            ['Chun Ma 駿馬', 'R23', 14280, 'N'],
            ['Yat Tung Estate South 逸東邨南', 'T03', 17608, 'N'],
            ['Chung On 頌安', 'R24', 21695, 'N'],
            ['Tung Chung North 東涌北', 'T04', 23377, 'N'],
            ['Kam To 錦濤', 'R25', 18913, 'N'],
            ['Tung Chung South 東涌南', 'T05', 19858, 'N'],
            ['Ma On Shan Town Centre 馬鞍山市中心', 'R26', 16661, 'N'],
            ['Discovery Bay 愉景灣', 'T06', 19159, 'N'],
            ['Lee On 利安', 'R27', 17250, 'N'],
            ['Peng Chau & Hei Ling Chau 坪洲及喜靈洲', 'T07', 7200737, 'R'],
            ['Fu Lung 富龍', 'R28', 15465, 'N'],
            ['Lamma & Po Toi 南丫及蒲台', 'T08', 'R'],
            ['Wu Kai Sha 烏溪沙', 'R29', 16322, 'N'],
            ['Cheung Chau South 長洲南', 'T09', 11579, 'N'],
            ['Kam Ying 錦英', 'R30', 16687, 'N'],
            ['Cheung Chau North 長洲北', 'T10', 'R'],
            ['Yiu On 耀安', 'R31', 17115, 'N'],
            ['Heng On 恒安', 'R32', 19502, 'N'],
            ['On Tai 鞍泰', 'R33', 20771, 'N'],
            ['Luen Wo Hui 聯和墟', 'N01', 20869, 'R'],
            ['Tai Shui Hang 大水坑', 'R34', 18834, 'N'],
            ['Yu Yan 愉欣', 'R35', 17384, 'N'],
            ['Bik Woo 碧湖', 'R36', 16872, 'N'],
            ['Kwong Hong 廣康', 'R37', 18904, 'N'],
            ['Kwong Yuen 廣源', 'R38', 12995, 'N'],
            ['Sheung Shui Rural 上水鄉郊', 'N11', 21875, 'R'],
            ['Shek Wu Hui 石湖墟', 'N13', 20653, 'R'],
            ['Fung Tsui 鳳翠', 'N15', 15286, 'R'],
            ['Sha Ta 沙打', 'N16', 15096, 'R'],
            ['Tin Ping East 天平東', 'N17', 17134, 'R'],
            ['Queens Hill 皇后山', 'N18', 16710, 'R'],
            ['Tai Po Kau 大埔滘', 'P10', 22701, 'R'],
            ['San Fu 新富', 'P12', 15392, 'R'],
            ['Lam Tsuen Valley 林村谷', 'P13', 18560, 'R'],
            ['Tai Wo 太和', 'P15', 13927, 'R'],
            ['Shuen Wan 船灣', 'P18', 19047, 'R'],
            ['Pak Sha Wan 白沙灣', 'Q02', 16040, 'R'],
            ['Sai Kung Islands 西貢離島', 'Q03', 12382, 'R'],
            ['Hang Hau East 坑口東', 'Q04', 13607, 'R'],
            ['Hang Hau West 坑口西', 'Q05', 16393, 'R'],
            ['Po Yee 寶怡', 'Q06', 16857, 'N'],
            ['Wai King 維景', 'Q07', 15330, 'N'],
            ['Do Shin 都善', 'Q08', 15066, 'N'],
            ['Kin Ming 健明', 'Q09', 15657, 'N'],
            ['Choi Kin 彩健', 'Q10', 19806, 'N'],
            ['O Tong  澳唐', 'Q11', 18209, 'R'],
            ['Fu Kwan 富君', 'Q12', 19058, 'R'],
            ['Kwan Po 軍寶', 'Q13', 14125, 'R'],
            ['Nam On 南安', 'Q14', 18872, 'N'],
            ['Hong King 康景', 'Q15', 19706, 'N'],
            ['Tsui Lam 翠林', 'Q16', 14945, 'N'],
            ['Po Lam 寶林', 'Q17', 15367, 'N'],
            ['Yan Ying 欣英', 'Q18', 18330, 'N'],
            ['Wan Hang 運亨', 'Q19', 20994, 'R'],
            ['King Lam 景林', 'Q20', 16855, 'N'],
            ['Hau Tak 厚德', 'Q21', 17946, 'N'],
            ['Fu Nam 富藍', 'Q22', 16564, 'N'],
            ['Tak Ming 德明', 'Q23', 18755, 'N'],
            ['Sheung Tak 尚德', 'Q24', 19877, 'N'],
            ['Kwong Ming 廣明', 'Q25', 17600, 'N'],
            ['Wan Po North 環保北', 'Q26', 17088, 'R'],
            ['Wan Po South 環保南', 'Q27', 18274, 'R']
        ],
        false);

    console.table(data)
    var view = new google.visualization.Dataview(data)
    view.setColumns([0, 2, 3])
    var options = {
        region: 'HK',
        displayMode: 'auto',
        enableRegionInteractivity: 'true',
        keepAspectRatio: 'true',
        legend: 'none',
        crosshair: {
            trigger: 'both',
            orientation: 'both',
            color: 'aqua',
            opacity: 0.5,
        },
        markerOpacity: 0.9,
        tooltip: {
            trigger: 'focus',
            textStyle: {
                color: 'grey',
                fontName: 'Arial',
                bold: 'true'
            }
        },
        colorAxis: { colors: ['dodgerBlue', 'deepPink', 'darkkhaki', 'forestgreen'] },
        backgroundColor: { fill: 'white' },
        datalessRegionColor: '#rgb(220, 220, 220)',
        defaultColor: 'white'
    };
    /* var chart = new google.visualization.GeoChart(document.getElementById('map'));
    chart.draw(view, options); */

    function selectHandler() {
        var selection = chart.getSelection()[0];
        if (selection) {
            selectedGroup = view.getValue(selection.row, 3)
        }
    }
    google.visualization.events.addListener(chart, 'select', selectHandler);;

    var selectview = new google.visualization.DataView(view);
    selectview.setRows(view.getFilteredRows[{ column: 3, value: selectedGroup }]);
    selectview.hideColumns([1, 3]);
    selectview.draw(view, options);
    var table = new google.visualization.Table(document.getElementById('table'));
    table.draw(view, { width: '100%' });
}