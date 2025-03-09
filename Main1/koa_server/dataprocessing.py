import numpy as np
import csv
import json
import pandas as pd

# 读取csv文件并转为dataframe格式, error_bad_lines=False
data = pd.read_csv('data/master.csv', error_bad_lines=False)
# gedata = pd.read_csv('data/data.csv', error_bad_lines=False)
gedata = pd.read_csv('data/chi_data.csv', index_col=0, error_bad_lines=False)
maps = pd.read_csv('data/全球所有国家经纬度.csv', error_bad_lines=False)
reverse = pd.read_excel('data/全世界各国全称及简称大全(中英对照).xls', sheet_name=0, header = 1)
# data = pd.DataFrame(data)
gedata = pd.DataFrame(gedata)
reverse = pd.DataFrame(reverse)

# 数据处理
# 取出data.csv中Indicator列
# gedata = gedata.drop(['Indicator'], axis=1)
print(gedata.head())
# print(type(gedata.loc[0,'First Tooltip']))
# 改变标签
# datas = pd.read_json('life-expectancy-table.json')
# datas = pd.DataFrame(datas)
# datas.columns = datas.loc[0]
# datas = datas.drop([0])
# datas=datas.reset_index(drop=True)
# 改变列名
print(len(gedata['Location'].unique()))
data = data.rename(columns={'country':'Country','year':'Year','sex':'Gender','age':'Age','suicides_no':'SuicidesNo','population':'Population','suicides/100k pop':'Suicides100kPop','country-year':'CountryYear','HDI for year':'HDIForYear',' gdp_for_year ($) ':'GdpForYearMoney','gdp_per_capita ($)':'GdpPerCapitalMoney','generation':'Generation'})
reverse = reverse.rename(columns={'中文名称':'name1','英文名称':'name2','国家/地区代码':'singname', '中文全称':'chiname','英文全称':'name3'})
# gedata = gedata.rename(columns={'country':'Country','year':'Year','sex':'Gender','age':'Age','suicides_no':'SuicidesNo','population':'Population'})
maps = maps.rename(columns={'编号':'No','国家名字（English）':'country','经度':'longitude','纬度':'Latitude'})
# no = []
# for i in gedata['Location']:
#     print(reverse[reverse['name1']==i].singname, list(reverse[reverse['name1']==i].singname))
#     no.append(list(reverse[reverse['name1']==i].singname)[0])
# gedata['No'] = no
# gedata.to_csv('data/chi_data.csv', encoding='utf-8-sig')
# print(len(gedata['Location']),len(gedata['Period']),len(gedata['No']))
# 处理有大量空值的列 有空值的行。
# data = data.drop(['HDIForYear', 'CountryYear'], axis=1)
# data = data.dropna(axis=0, how='any')
# gedata = gedata.dropna(axis=0, how='any')
# data=data.reset_index(drop=True)
# gedata=gedata.reset_index(drop=True)

# =================================将英文名字改为中文, 以防多次运行浪费时间====================================
# for i in range(len(gedata['Location'])):
#     if gedata.loc[i,'Location'] in list(reverse['name2']):
#         gedata.loc[i, 'Location'] = list(reverse[(reverse["name2"] == gedata.loc[i, 'Location'])].name1)[0]
#     elif gedata.loc[i,'Location'] in list(reverse['name3']):
#         gedata.loc[i, 'Location'] = list(reverse[(reverse["name3"] == gedata.loc[i, 'Location'])].name1)[0]
#     else:
#         print(i)
# # =================================获取自杀率只取数字后面部分剔除====================================
# for i in range(len(gedata['Location'])):
#     a = gedata.loc[i,'First Tooltip']
#     b = ''
#     for j in a:
#         if j == ' ':
#             break
#         else:
#             b = b + j
#     gedata.loc[i, 'First Tooltip'] = b
# print(gedata.head(10))
# gedata.to_csv('data/chi_data.csv',encoding='utf-8-sig')
#

# -----------------------------------动态柱状图----不同国家自杀率随时间变化排序-------------------------------------
# rankchange = {"SuicideRate":[],"Country": [],"Year":[]}
# year = list(gedata['Period'].unique())
# countries = ['立陶宛','英国','俄罗斯','韩国','圭亚那','斯里兰卡','苏里南','日本','白俄罗斯']
# for i in countries:
#     print(i)
#     print(len(list(gedata[gedata['Location']== i].Period)))
# for i in countries:
#     for j in year:
#         if j not in list(gedata[(gedata['Location'] == i)].Period):
#             year.remove(j)
# print(year)
# year = sorted(year)
# print(year)
# # print(year, len(year))//共16个年份[2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]
# for i in year:
#     for j in countries:
#         rankchange['SuicideRate'].append(list(gedata[(gedata['Location']==j)&(gedata['Period']==i)&(gedata['Dim1']=='Both sexes')]['First Tooltip'])[0])
#         rankchange['Year'].append(i)
#         rankchange['Country'].append(j)
# print(rankchange)
# rankchange = pd.DataFrame(rankchange)
# print(rankchange.head())
# rankchange.to_json('data/rankchange.json',force_ascii=False, orient="split", indent=4)

# 仅获取国家 自杀率 导出为map.json
# 现在开始分析，最小年份和最大年份

# 1985最小年份和2016最大年份
# 找到指定国家年份中自杀人数的变化
# sui_cou=data.groupby(['Country'],as_index=False).agg({'SuicidesNo':sum})
# sui_cou.sort_values(['SuicidesNo'],ascending=False,inplace=True)
# sui_cou = sui_cou.head(15)
# country_2000 = list(sui_cou['Country'])
# country_2000_num = []
# country_2000_population = []
# country_2000_rate = []
# for country in country_2000:
#     if sum(data[(data['Country'] == country)].SuicidesNo) == 0:
#         country_2000.remove(country)
#         print(country)
# for country in country_2000:
#     suicideno = sum(data[(data['Country'] == country)&(data['Year'] == 2000)].SuicidesNo)
#     population = sum(data[(data['Country'] == country)&(data['Year'] == 2000)].Population)
#     country_2000_num.append(suicideno)
#     country_2000_population.append(population)
#     if sum(data[(data['Country'] == country)&(data['Year'] == 2000)].SuicidesNo) == 0:
#         country_2000.remove(country)
#         print(country)
#         continue
#     country_2000_rate.append(np.around(((suicideno*1000)/population), 4))
# print(len(country_2000_num))
# print(len(country_2000_population))
# print(len(country_2000))
# map_2000 = {'Country':country_2000, 'SuicidesNo':country_2000_num, 'Population':country_2000_population, 'Rate':country_2000_rate}
# print(map_2000)
# df_1985 = pd.DataFrame(map_2000)
#
# print(df_1985.index)
# print(df_1985.columns)
# df_1985.to_json('data/master.json', orient="records",force_ascii=False)
# print(df_1985)
#

# ===============================================面积堆叠图=====================================================
# # # 世界平均自杀率  对于不同年龄段 不同年代
# data_year = list(range(1990,2011,1))
# data_year = str(data_year)
# print(type(data_year))
# year_rate = []
# for year in data_year:
#     suicide_no = sum(data[data['Year'] == year].SuicidesNo)
#     population = sum(data[(data['Year'] == year)].Population)
#     year_rate.append((suicide_no*10000)/population)
#
# data_age_5_14=[]
# data_age_15_24=[]
# data_age_25_34=[]
# data_age_35_54=[]
# data_age_55_74=[]
# data_age_75=[]
#
# for year in data_year:
#         data_age_5_14.append(sum(data[(data['Year'] == year)&(data['Age']=='5-14 years')].SuicidesNo))
#         data_age_15_24.append(sum(data[(data['Year'] == year)&(data['Age']=='15-24 years')].SuicidesNo))
#         data_age_25_34.append(sum(data[(data['Year'] == year)&(data['Age']=='25-34 years')].SuicidesNo))
#         data_age_35_54.append(sum(data[(data['Year'] == year)&(data['Age']=='35-54 years')].SuicidesNo))
#         data_age_55_74.append(sum(data[(data['Year'] == year)&(data['Age']=='55-74 years')].SuicidesNo))
#         data_age_75.append(sum(data[(data['Year'] == year)&(data['Age']=='75+ years')].SuicidesNo))
# print(data_age_15_24)
# data_male = []
# data_female = []
#
# for year in data_year:
#     data_male.append(
#         sum(data[(data['Year'] == year) & (data['Gender'] == 'male')].SuicidesNo))
#     data_female.append(
#         sum(data[(data['Year'] == year) & (data['Gender'] == 'female')].SuicidesNo))
#
# data_GenerationX = []
# data_Silent = []
# data_GIGeneration = []
# data_Boomers = []
# data_Millenials = []
# data_GenerationZ = []
#
# for year in data_year:
#     data_GenerationX.append(
#         sum(data[(data['Year'] == year) & (data['Generation'] == 'Generation X')].SuicidesNo))
#     data_Silent.append(
#         sum(data[(data['Year'] == year) & (data['Generation'] == 'Silent')].SuicidesNo))
#     data_GIGeneration.append(
#         sum(data[(data['Year'] == year) & (data['Generation'] == 'G.I. Generation')].SuicidesNo))
#     data_Boomers.append(
#         sum(data[(data['Year'] == year) & (data['Generation'] == 'Boomers')].SuicidesNo))
#     data_Millenials.append(
#         sum(data[(data['Year'] == year) & (data['Generation'] == 'Millenials')].SuicidesNo))
#     data_GenerationZ.append(
#         sum(data[(data['Year'] == year) & (data['Generation'] == 'Generation Z')].SuicidesNo))

# worldmaps = [0,0,0]
# worldmaps[0]=low
# worldmaps[1]=medium
# worldmaps[2]=high
# print(worldmaps)
# worldmaps = pd.DataFrame(worldmaps)
# print(worldmaps)
# worldmaps.to_json('data/worldMap.json', orient="records",force_ascii=False)

#
# rate = {}
# data = json.loads(json.dumps(rate))
# suiratefile = ('data/suirate.json')
# sui_rate = {'suirate':{}, 'agerate':{}, 'common':{}, 'types':[]}
# data['sui_rate'] = sui_rate
# suirate = {'title':'平均自杀数', 'unit':'人', 'data':[]}
# agerate = {'title':'不同年龄段平均自杀数', 'unit':'人', 'data':[]}
# # sexrate = {'title':'不同性别平均自杀数', 'unit':'人', 'data':[]}
# for i in range(len(data_year)):
#     data_year[i] = str(data_year[i])
# common = {'year': data_year}
# # !!!!!!!!!!!!!!!!!!!!!!!!suirate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# data['sui_rate']['suirate'] = suirate
# datas1 = [{'name':'大兵的一代:1901—1924', 'data':data_GIGeneration},
#         {'name':'沉默的一代:1925-1929', 'data':data_Silent},
#         {'name':'婴儿潮一代:1943-1960', 'data':data_Boomers},
#         {'name':'无名代:1965-1981', 'data':data_GenerationX},
#         {'name':'千年代:1982—1995', 'data':data_Millenials},
#         {'name':'Z一代:1996-2010', 'data':data_GenerationZ}]
# data['sui_rate']['suirate']['data'] = datas1
# # !!!!!!!!!!!!!!!!!!!!!!!!yearrate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# data['sui_rate']['agerate'] = agerate
# datas2 = [{'name':'age:5-14', 'data':data_age_5_14},
#         {'name':'age:15-24', 'data':data_age_15_24},
#         {'name':'age:25-34', 'data':data_age_25_34},
#         {'name':'age:35-54', 'data':data_age_35_54},
#         {'name':'age:55-74', 'data':data_age_55_74},
#         {'name':'age:75', 'data':data_age_75}]
# data['sui_rate']['agerate']['data'] = datas2
# # !!!!!!!!!!!!!!!!!!!!!!!!sexrate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# # data['sui_rate']['sexrate'] = sexrate
# # datas3 = [{'name':'male', 'data':data_male},
# #         {'name':'female', 'data':data_female}]
# # data['sui_rate']['sexrate']['data'] = datas3
# # ,{'key': 'sexrate', 'text': '不同性别平均自杀数'},
# # !!!!!!!!!!!!!!!!!!!!!!!!common!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# data['sui_rate']['common'] = common
# # !!!!!!!!!!!!!!!!!!!!!!!!type!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# data['sui_rate']['types'] = [{'key': 'suirate', 'text': '平均自杀数'},
#                              {'key': 'agerate', 'text': '不同年龄段平均自杀数'}]
# json.dump(sui_rate, open(suiratefile, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
#

# -------------------------------------世界地图-----------------------------------------
# ==================================获取各国经纬度，成立新表locate==============================================
# country_2019 = gedata[gedata['Period'] == 2019].No.unique()
# locat = {'No':[], 'country': [], 'longitude':[], 'Latitude':[], 'rate':[]}
# country_2009 = list(country_2019)
# print(country_2019)
# for no in country_2019:
#     # print(list(maps[maps['country'] == country].longitude)[0])
#     if no not in list(maps['No']):
#         print('=====',no)
#         break
#     print(list(gedata[gedata['No'] == no].Location.unique()))
#     locat['country'].append(list(gedata[gedata['No'] == no].Location.unique())[0])
#     locat['longitude'].append(list(maps[maps['No'] == no].longitude)[0])
#     locat['Latitude'].append(list(maps[maps['No'] == no].Latitude)[0])
#     locat['No'].append(no)
#     # print(no,list(gedata[(gedata['No'] == no)&(gedata['Dim1']=='Both sexes')&(gedata['Period']==2019)]['First Tooltip']))
#     locat['rate'].append(list(gedata[(gedata['No'] == no)&(gedata['Dim1']=='Both sexes')&(gedata['Period']==2019)]['First Tooltip'])[0])
# lenc = len(locat['country'])
# print('---------------------------------------')
# print(len(locat['longitude']))
# worldmap = pd.DataFrame(locat)
# print(worldmap.head(5))
# print(worldmap.columns)
# low = {'name':'<12', 'children':[]}
# medium = {'name':'12-18', 'children':[]}
# high = {'name':'>18', 'children':[]}
# # ------------------------low-------------------------------
# data1 = [{'No':'a','name':'a','value':[],'rate':0} for i in range(lenc)]
# i = 0
# n = 0
# while i < lenc:
#     if float(worldmap.loc[i, 'rate']) < 12:
#         data1[n]['No']=worldmap.loc[i, 'No']
#         data1[n]['name']=worldmap.loc[i, 'country']
#         print(worldmap.loc[i, 'longitude'])
#         data1[n]['value'].append(worldmap.loc[i, 'longitude'])
#         data1[n]['value'].append(worldmap.loc[i, 'Latitude'])
#         data1[n]['rate']=worldmap.loc[i, 'rate']
#         n += 1
#     else:
#         del data1[-1]
#     i += 1
# low['children'] = data1
# print(len(low['children']))
# print(low['children'])
# # ------------------------medium-------------------------------
# data2 = [{'No':'a','name':'a','value':[],'rate':0} for i in range(lenc)]
# i = 0
# n = 0
# while i < lenc:
#     if float(worldmap.loc[i, 'rate']) < 18 and float(worldmap.loc[i, 'rate']) >= 12:
#         data2[n]['No'] = worldmap.loc[i, 'No']
#         data2[n]['name']=worldmap.loc[i, 'country']
#         data2[n]['value'].append(worldmap.loc[i, 'longitude'])
#         data2[n]['value'].append(worldmap.loc[i, 'Latitude'])
#         data2[n]['rate']=worldmap.loc[i, 'rate']
#         n += 1
#     else:
#         del data2[-1]
#     i += 1
# medium['children'] = data2
# print(len(medium['children']))
# print(medium['children'])
# # ------------------------high-------------------------------
# data3 = [{'No':'a','name':'a','value':[],'rate':0} for i in range(lenc)]
# i = 0
# n = 0
# while i < lenc:
#     if float(worldmap.loc[i, 'rate']) >= 18:
#         data3[n]['No'] = worldmap.loc[i, 'No']
#         data3[n]['name']=worldmap.loc[i, 'country']
#         data3[n]['value'].append(worldmap.loc[i, 'longitude'])
#         data3[n]['value'].append(worldmap.loc[i, 'Latitude'])
#         data3[n]['rate']=worldmap.loc[i, 'rate']
#         n += 1
#     else:
#         del data3[-1]
#     i += 1
# high['children'] = data3
# print(len(high['children']))
# print(high['children'])
# # =====================将三个字典组合成为datafram并转换为json文件=========================
# worldmaps = [0,0,0]
# worldmaps[0]=low
# worldmaps[1]=medium
# worldmaps[2]=high
# print(worldmaps)
# worldmaps = pd.DataFrame(worldmaps)
# print(worldmaps)
# worldmaps.to_json('data/worldMap.json', orient="records",force_ascii=False)

# # =================================对各国自杀数目排名，筛选出前15个国家======================================
# countries = ['立陶宛','英国','俄罗斯','韩国','圭亚那','斯里兰卡','苏里南','日本','白俄罗斯']
# sui_cou=data.groupby(['Country'],as_index=False).agg({'SuicidesNo':sum})
# sui_cou.sort_values(['SuicidesNo'],ascending=False,inplace=True)
# sui_cou = sui_cou.head(15)
# country = list(sui_cou['Country'])
# chicountry = []
# for i in country:
#     if i in list(reverse['name2']):
#         chicountry.append(list(reverse[(reverse["name2"] == i)].name1)[0])
#     elif i in list(reverse['name3']):
#         chicountry.append(list(reverse[(reverse["name3"] == i)].name1)[0])
#     else:
#         print(i)
# print(country)
# print(chicountry)
# # # =======================筛选出所有数据都具备的年份============================
# year = list(data['Year'].unique())
# years = year
# for i in country:
#     for j in years:
#         if j not in list(data[data['Country'] == i].Year):
#             year.remove(j)
# year.sort()
# year.remove(1998)
# # sorted(year)
# print(year)
# # =========================建立列表series=============================
# series = [[] for i in range(len(year))]
# for i in range(len(year)):
#     for j in range(len(country)):
#         # gdpsui = {'PerGdp': 0, 'SuiRate': 0, 'Country': 0, 'Year': 0}
#         flag = 1
#         gdpsui = [0 for i in range(5)]
#         m=sum(data[(data['Year'] == year[i])&(data['Country'] == country[j])].SuicidesNo)
#         n=sum(data[(data['Year'] == year[i])&(data['Country'] == country[j])].Population)
#         if n == 0:
#             flag = 0
#             continue
#         gdpsui[3] = chicountry[j]
#         gdpsui[4] = str(year[i])
#         gdpsui[1] = np.around(float(m*10000/n),3)
#         gdpsui[2] = n
#         gdpsui[0] = np.around(np.mean(data[(data['Year'] == year[i])&(data['Country'] == country[j])].GdpPerCapitalMoney))
#         print(gdpsui)
#         series[i].append(gdpsui)
# print(series)
# print(len(series))
# # ===============================创建json表=====================================
# pergdp = {}
# data = json.loads(json.dumps(pergdp))
# pergdpfile = ('data/gdpsui.json')
# year = [str(x) for x in year]
# print(year)
# pergdpsui = {'counties':chicountry,'timeline':year,'series':series}
# data['gdpsui'] = pergdpsui
# json.dump(pergdpsui, open(pergdpfile, "w"), indent=4, ensure_ascii=False)

# # 地图中国家简写
# countryname = list(maps['country'])
# countryNo = list(maps['No'])
# map_change = {'Country':[], 'countryNo':[]}
# for i in range(len(countryname)):
#     if countryname[i] in country_2009:
#         map_change['Country'].append(countryname[i])
#         map_change['countryNo'].append(countryNo[i])
# print(map_change)
# with open('data/map_change.txt', 'w', encoding="utf-8") as file:
#     for lat in range(len(map_change['countryNo'])):
#         if ' ' in map_change['Country'][lat]:
#             str1="\'" + str(map_change['Country'][lat]) + "\'" + ": \'" + str(map_change['countryNo'][lat]) + ".geo\'"
#         else:
#             str1 = str(map_change['Country'][lat]) + ": \'" + str(map_change['countryNo'][lat]) + ".geo\'"
#         file.writelines(str1+','+'\n')
# file.close()