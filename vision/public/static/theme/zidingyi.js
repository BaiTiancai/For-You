<!DOCTYPE HTML>
<!-- saved from url=(0048)https://echarts.apache.org/zh/theme-builder.html -->
<!DOCTYPE html PUBLIC "" ""><HTML lang="zh-CN"><HEAD><META content="IE=11.0000" 
http-equiv="X-UA-Compatible">

<META charset="utf-8">
<META http-equiv="X-UA-Compatible" content="IE=edge">
<META name="viewport" content="width=device-width, initial-scale=1" 
user-scalable="no">
<META name="description" content="ECharts, a powerful, interactive charting and visualization library for browser"><LINK 
href="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/favicon.png?_v_=20200710_1" 
rel="shortcut icon"><LINK href="zidingyi_files/bootstrap.min.css" rel="stylesheet" 
type="text/css"><!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries--><!--[if lt IE 9]><script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script><script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]--><LINK 
href="zidingyi_files/main.css" rel="stylesheet" type="text/css">
<SCRIPT>window.EC_WWW_LANG = 'zh';
</SCRIPT>

<SCRIPT src="zidingyi_files/pace.min.js" type="text/javascript"></SCRIPT>

<SCRIPT id="font-hack" type="text/javascript">if (/windows/i.test(navigator.userAgent)) {
    var el = document.createElement('style');
    el.innerHTML = ''
        + '@font-face {font-family:"noto-thin";src:local("Microsoft Yahei");}'
        + '@font-face {font-family:"noto-light";src:local("Microsoft Yahei");}';
    document.head.insertBefore(el, document.getElementById('font-hack'));
}
</SCRIPT>
<TITLE>主题编辑器 - Apache ECharts</TITLE>
<SCRIPT src="zidingyi_files/jquery.min.js" type="text/javascript"></SCRIPT>

<META name="GENERATOR" content="MSHTML 11.00.10570.1001"></HEAD><!--[if lte IE 8]><body class="lower-ie"><div id="lowie-main"><img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/forie.png?_v_=20200710_1" alt="ie tip"></div></body><![endif]--> <!--[if (gt IE 8)|!(IE)]><body class="undefined"></body><![endif]-->
<BODY>
<DIV id="apache-banner">
<DIV class="txt">
<P>请访问 Apache ECharts 的官网 &nbsp;</P><A id="a1" href="https://echarts.apache.org/zh/index.html">https://echarts.apache.org/zh/index.html</A></DIV><A 
class="btn btn-main" onclick="logApache()" href="https://echarts.apache.org/" 
target="_blank">
<DIV>访问官网</DIV></A><A class="close-btn" onclick="closeApacheBanner(true)" href="javascript:;">x</A></DIV>
<DIV id="main"><NAV class="navbar navbar-default navbar-fixed-top" role="navigation">
<DIV class="container-fluid">
<DIV class="navbar-header"><BUTTON class="navbar-toggle collapsed" 
aria-expanded="false" type="button" data-toggle="collapse" data-target="#navbar-collapse"><SPAN 
class="sr-only">Toggle navigation</SPAN><SPAN class="icon-bar"></SPAN><SPAN 
class="icon-bar"></SPAN><SPAN class="icon-bar"></SPAN></BUTTON><A class="navbar-brand" 
href="https://echarts.apache.org/zh/index.html"><IMG class="navbar-logo" alt="echarts logo" 
src="zidingyi_files/logo.png"></A></DIV>
<DIV class="collapse navbar-collapse" id="navbar-collapse">
<UL class="nav navbar-nav navbar-left">
  <LI id="nav-index"><A 
  href="https://echarts.apache.org/zh/index.html">首页</A></LI>
  <LI class="dropdown" id="nav-doc"><A class="dropdown-toggle" href="https://echarts.apache.org/zh/theme-builder.html#" 
  data-toggle="dropdown">文档<B class="caret"></B></A>
  <UL class="dropdown-menu">
    <LI><A href="https://echarts.apache.org/zh/feature.html">特性</A></LI>
    <LI><A href="https://echarts.apache.org/zh/tutorial.html">教程</A></LI>
    <LI><A href="https://echarts.apache.org/zh/api.html">API</A></LI>
    <LI><A href="https://echarts.apache.org/zh/option.html">配置项手册</A></LI>
    <LI><A href="https://echarts.apache.org/zh/changelog.html">版本记录</A></LI>
    <LI><A href="https://echarts.apache.org/zh/faq.html">常见问题</A></LI>
    <LI><A 
    href="https://echarts.apache.org/zh/tutorial.html#ECharts%205%20升级指南">v5 
    升级指南<SPAN class="new">new</SPAN></A></LI></UL></LI>
  <LI class="dropdown" id="nav-download"><A class="dropdown-toggle" href="https://echarts.apache.org/zh/theme-builder.html#" 
  data-toggle="dropdown">下载<B class="caret"></B></A>
  <UL class="dropdown-menu">
    <LI><A href="https://echarts.apache.org/zh/download.html">下载</A></LI>
    <LI><A 
href="https://echarts.apache.org/zh/download-theme.html">主题下载</A></LI>
    <LI><A 
    href="https://echarts.apache.org/zh/download-extension.html">扩展下载</A></LI></UL></LI>
  <LI id="nav-examples"><A href="https://echarts.apache.org/examples/zh/index.html">示例</A></LI>
  <LI id="nav-resources"><A class="dropdown-toggle" href="https://echarts.apache.org/zh/theme-builder.html#" 
  data-toggle="dropdown">资源<B class="caret"></B></A>
  <UL class="dropdown-menu">
    <LI><A href="https://echarts.apache.org/zh/spreadsheet.html">表格工具</A></LI>
    <LI><A 
    href="https://echarts.apache.org/zh/theme-builder.html">主题构建工具</A></LI>
    <LI><A href="https://echarts.apache.org/zh/cheat-sheet.html">术语速查手册</A></LI>
    <LI><A 
  href="https://echarts.apache.org/zh/resources.html">更多资源</A></LI></UL></LI>
  <LI id="nav-contribute"><A class="dropdown-toggle" href="https://echarts.apache.org/zh/theme-builder.html#" 
  data-toggle="dropdown">社区<B class="caret"></B></A>
  <UL class="dropdown-menu">
    <LI><A href="https://echarts.apache.org/zh/events.html">活动</A></LI>
    <LI><A href="https://echarts.apache.org/zh/committers.html">贡献者列表</A></LI>
    <LI><A href="https://echarts.apache.org/zh/maillist.html">邮件列表</A></LI>
    <LI><A href="https://echarts.apache.org/zh/contributing.html">如何贡献</A></LI>
    <LI><A href="https://echarts.apache.org/zh/dependencies.html">依赖项</A></LI>
    <LI><A 
    href="https://echarts.apache.org/zh/coding-standard.html">代码规范</A></LI>
    <LI><A href="https://github.com/apache/echarts" 
    target="_blank">源码（GitHub）<svg xmlns="http://www.w3.org/2000/svg" class="icon-external-link" 
    viewBox="0 0 100 100" width="15px" height="15px" version="1.1"><path fill="currentColor" 
    d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI>
    <LI><A href="https://github.com/apache/echarts/issues" 
    target="_blank">Issues（GitHub）<svg xmlns="http://www.w3.org/2000/svg" 
    class="icon-external-link" viewBox="0 0 100 100" width="15px" height="15px" 
    version="1.1"><path fill="currentColor" d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI></UL></LI>
  <LI id="nav-others"><A class="dropdown-toggle" href="https://echarts.apache.org/zh/theme-builder.html#" 
  data-toggle="dropdown">ASF<B class="caret"></B></A>
  <UL class="dropdown-menu">
    <LI><A href="https://www.apache.org/" target="_blank">Apache Software 
    Foundation<svg xmlns="http://www.w3.org/2000/svg" class="icon-external-link" 
    viewBox="0 0 100 100" width="15px" height="15px" version="1.1"><path fill="currentColor" 
    d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI>
    <LI><A href="https://echarts.apache.org/zh/security.html">安全</A></LI>
    <LI><A href="https://www.apache.org/licenses/" target="_blank">版权<svg 
    xmlns="http://www.w3.org/2000/svg" class="icon-external-link" viewBox="0 0 100 100" 
    width="15px" height="15px" version="1.1"><path fill="currentColor" d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI>
    <LI><A href="https://www.apache.org/events/current-event" 
    target="_blank">活动<svg xmlns="http://www.w3.org/2000/svg" class="icon-external-link" 
    viewBox="0 0 100 100" width="15px" height="15px" version="1.1"><path fill="currentColor" 
    d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI>
    <LI><A href="https://www.apache.org/foundation/sponsorship.html" target="_blank">捐赠<svg 
    xmlns="http://www.w3.org/2000/svg" class="icon-external-link" viewBox="0 0 100 100" 
    width="15px" height="15px" version="1.1"><path fill="currentColor" d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI>
    <LI><A href="https://www.apache.org/foundation/thanks.html" 
    target="_blank">鸣谢<svg xmlns="http://www.w3.org/2000/svg" class="icon-external-link" 
    viewBox="0 0 100 100" width="15px" height="15px" version="1.1"><path fill="currentColor" 
    d="M 18.8 85.1 h 56 l 0 0 c 2.2 0 4 -1.8 4 -4 v -32 h -8 v 28 h -48 v -48 h 28 v -8 h -32 l 0 0 c -2.2 0 -4 1.8 -4 4 v 56 C 14.8 83.3 16.6 85.1 18.8 85.1 Z" 
    /><polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" 
    /></svg></A></LI></UL></LI></UL>
<UL class="nav navbar-nav navbar-right">
  <LI id="nav-homeen"><A onclick="changeLang('en')" 
  href="javascript:;">EN</A></LI></UL></DIV></DIV></NAV>
<DIV class="page-main"><LINK href="zidingyi_files/bootstrap-colorpicker.min.css" 
rel="stylesheet"> <LINK href="zidingyi_files/default.css" rel="stylesheet"> 
<LINK href="zidingyi_files/github.css" rel="stylesheet"> <LINK href="zidingyi_files/main(1).css" 
rel="stylesheet"> 
<DIV id="theme-builder">
<DIV class="container-fluid" id="content">
<DIV class="row scroll-parent">
<DIV class="col-md-3 col-sm-4 theme-config">
<DIV class="panel-group" id="acc-port">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A href="https://echarts.apache.org/zh/theme-builder.html#acc-port-body" 
data-toggle="collapse" data-parent="#acc-port">功能</A></H4></DIV>
<DIV class="panel-collapse collapse in" id="acc-port-body">
<DIV class="panel-body">
<DIV 
class="port-row"><INPUT id="input-file" style="display: none;" type="file" @change="importFileChanged"> 
                  
<DIV class="btn-group" role="group"><BUTTON class="btn btn-primary" type="button" 
data-toggle="modal" data-target="#download-js-modal" @click="useTheme()"><SPAN 
class="glyphicon glyphicon-download-alt"></SPAN>                       下载主题      
               </BUTTON>                     <BUTTON class="btn btn-default" 
type="button" @click="importJson()"><SPAN 
class="glyphicon glyphicon-import"></SPAN>                       导入配置            
         </BUTTON>                     <BUTTON class="btn btn-default" type="button" 
@click="exportJson()"><SPAN class="glyphicon glyphicon-export"></SPAN>           
            导出配置                     </BUTTON>                   </DIV></DIV>
<DIV class="port-row">
<DIV class="btn-group" role="group"><BUTTON class="btn btn-default" type="button" 
@click="updateCharts(true)"><SPAN class="glyphicon glyphicon-refresh"></SPAN>    
                   刷新                     </BUTTON>                     <BUTTON 
class="btn btn-default" type="button" @click="newTheme()"><SPAN class="glyphicon glyphicon-repeat"></SPAN> 
                      复原                     </BUTTON>                     
<BUTTON class="btn btn-default" data-toggle="modal" data-target="#download-modal"><SPAN 
class="glyphicon glyphicon-question-sign"></SPAN>                       帮助       
              </BUTTON>                   </DIV></DIV>
<FORM class="form form-horizontal">
<DIV class="form-group"><LABEL class="col-sm-3 control-label">主题名称</LABEL>       
              
<DIV 
class="col-sm-9"><INPUT class="form-control" v-model="themeName"></DIV></DIV>
<DIV class="form-group"><LABEL class="col-sm-3 control-label">系列数量</LABEL>       
              
<DIV class="col-sm-9"><INPUT class="form-control" type="number" v-model="theme.seriesCnt"></DIV></DIV></FORM>
<FORM class="form-horizontal">
<HR>

<H5>默认方案</H5>
<DIV class="row theme-plan-row">
<DIV class="col-xs-6" v-for="group in preDefinedThemes"><A title="{{ group.name }}" 
class="theme-plan-group" v-bind:style="{ backgroundColor: group.background }" 
@click="selectPreDefinedTheme($index)">
<DIV class="theme-plan-color" v-bind:style="{ backgroundColor: color }" v-for="color in group.theme"></DIV></A> 
                    </DIV></DIV></FORM></DIV></DIV></DIV></DIV><!-- end of acc-port --> 
        
<DIV class="panel-group" id="acc-theme">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A href="https://echarts.apache.org/zh/theme-builder.html#acc-theme-body" 
data-toggle="collapse" data-parent="#acc-theme">基本配置</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-theme-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="背景" :color.sync="theme.backgroundColor"></config-color> 
                  <config-color title="标题" 
:color.sync="theme.titleColor"></config-color>                   <config-color 
title="副标题" :color.sync="theme.subtitleColor"></config-color>                   
<config-color-list title="主题" :colors.sync="theme.color"></config-color-list>    
               <config-color title="标签文字" 
:color.sync="theme.markTextColor"></config-color>                   
<config-number title="描边粗细" :value.sync="theme.borderWidth"></config-number>     
              <config-color title="描边" 
:color.sync="theme.borderColor"></config-color>                 
</FORM></DIV></DIV></DIV></DIV><!-- end of acc-theme -->         
<DIV class="panel-group" id="acc-visualmap">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A href="https://echarts.apache.org/zh/theme-builder.html#acc-visualmap-body" 
data-toggle="collapse" data-parent="#acc-visualmap">视觉映射</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-visualmap-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color-list title="视觉映射" :colors.sync="theme.visualMapColor"></config-color-list> 
                </FORM></DIV></DIV></DIV></DIV><!-- end of acc-visualmap -->     
    
<DIV class="panel-group" id="acc-axis">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A href="https://echarts.apache.org/zh/theme-builder.html#acc-axis-body" 
data-toggle="collapse" data-parent="#acc-axis">坐标轴</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-axis-body">
<DIV class="panel-body">
<FORM class="form-horizontal">
<DIV class="form-group">
<DIV class="col-sm-12"><INPUT id="axisSeperateSetting" type="checkbox" @change="axisSeperateSettingChanges()" 
v-model="theme.axisSeperateSetting">                       <LABEL class="control-label" 
for="axisSeperateSetting">为不同类型坐标轴分别设置</LABEL>                     </DIV></DIV>
<DIV class="axis-group" v-for="axis in theme.axis" v-if="$index > 0 || !theme.axisSeperateSetting">
<H5 v-if="axis.type !== 'all'">{{ axis.name }}</H5><config-color title="轴线" 
:color.sync="axis.axisLineColor" :enabled.sync="axis.axisLineShow" can-disable=""></config-color> 
                    <config-color title="刻度" :color.sync="axis.axisTickColor" 
:enabled.sync="axis.axisTickShow" can-disable=""></config-color>                 
    <config-color-list title="网格" :colors.sync="axis.splitLineColor" 
:enabled.sync="axis.splitLineShow" can-disable=""></config-color-list>           
          <config-color-list title="填充" :colors.sync="axis.splitAreaColor" 
:enabled.sync="axis.splitAreaShow" can-disable=""></config-color-list>           
          <config-color title="文字" :color.sync="axis.axisLabelColor" 
:enabled.sync="axis.axisLabelShow" can-disable=""></config-color>                
   </DIV></FORM></DIV></DIV></DIV></DIV><!-- end of acc-axis -->         
<DIV class="panel-group" id="acc-legend">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="legend" href="https://echarts.apache.org/zh/theme-builder.html#acc-legend-body" 
data-toggle="collapse" data-parent="#acc-legend">图例</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-legend-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="文字" :color.sync="theme.legendTextColor"></config-color> 
                </FORM></DIV></DIV></DIV></DIV><!-- end of acc-legend -->        
 
<DIV class="panel-group" id="acc-toolbox">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="toolbox" href="https://echarts.apache.org/zh/theme-builder.html#acc-toolbox-body" 
data-toggle="collapse" data-parent="#acc-toolbox">工具箱</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-toolbox-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="图标" :color.sync="theme.toolboxColor"></config-color> 
                  <config-color title="悬停" :color.sync="theme.toolboxEmphasisColor"></config-color> 
                </FORM></DIV></DIV></DIV></DIV><!-- end of acc-toolbox -->       
  
<DIV class="panel-group" id="acc-tooltip">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="tooltip" href="https://echarts.apache.org/zh/theme-builder.html#acc-tooltip-body" 
data-toggle="collapse" data-parent="#acc-tooltip">提示框</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-tooltip-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="指示线" :color.sync="theme.tooltipAxisColor"></config-color> 
                  <config-number title="宽度" 
:value.sync="theme.tooltipAxisWidth"></config-number>                 
</FORM></DIV></DIV></DIV></DIV><!-- end of acc-tooltip -->         
<DIV class="panel-group" id="acc-timeline">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="tooltip" href="https://echarts.apache.org/zh/theme-builder.html#acc-timeline-body" 
data-toggle="collapse" data-parent="#acc-timeline">时间轴</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-timeline-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="标记" :color.sync="theme.timelineItemColor"></config-color> 
                  <config-color title="标记悬停" :color.sync="theme.timelineItemColorE"></config-color> 
                  <config-color title="标记选中" :color.sync="theme.timelineCheckColor"></config-color> 
                  <config-color title="标记选中描边" :color.sync="theme.timelineCheckBorderColor"></config-color> 
                  <config-number title="标记描边" :value.sync="theme.timelineItemBorderWidth"></config-number> 
                  <config-color title="主轴" 
:color.sync="theme.timelineLineColor"></config-color>                   
<config-number title="主轴宽度" 
:value.sync="theme.timelineLineWidth"></config-number>                   
<config-color title="控件填充" 
:color.sync="theme.timelineControlColor"></config-color>                   
<config-color title="控件描边" 
:color.sync="theme.timelineControlBorderColor"></config-color>                   
<config-number title="控件描边宽度" 
:value.sync="theme.timelineControlBorderWidth"></config-number>                  
 <config-color title="文字" :color.sync="theme.timelineLabelColor"></config-color> 
                </FORM></DIV></DIV></DIV></DIV><!-- end of acc-timeline -->      
   <!-- <div id="acc-datazoom" class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#acc-datazoom" href="#acc-datazoom-body" title="tooltip">数据缩放</a>
              </h4>
            </div>
            <div id="acc-datazoom-body" class="panel-collapse collapse">
              <div class="panel-body">
                <form class="form-horizontal">
                  <config-color title="背景" :color.sync="theme.datazoomBackgroundColor"></config-color>
                  <config-color title="数据背景" :color.sync="theme.datazoomDataColor"></config-color>
                  <config-color title="填充" :color.sync="theme.datazoomFillColor"></config-color>
                  <config-color title="控制手柄" :color.sync="theme.datazoomHandleColor"></config-color>
                  <config-number title="控制手柄大小" :value.sync="theme.datazoomHandleWidth"></config-number>
                  <config-color title="文字" :color.sync="theme.datazoomLabelColor"></config-color>
                </form>
              </div>
            </div>
          </div>
        </div> --> 
        <!-- end of acc-datazoom -->         
<DIV class="panel-group" id="acc-line">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="line" href="https://echarts.apache.org/zh/theme-builder.html#acc-line-body" 
data-toggle="collapse" data-parent="#acc-line">折线图</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-line-body">
<DIV class="panel-body">
<FORM class="form-horizontal">
<DIV class="form-group">
<DIV class="col-sm-12"><INPUT id="lineSmooth" type="checkbox" v-model="theme.lineSmooth"> 
                      <LABEL title="smooth" class="control-label" for="lineSmooth">平滑曲线</LABEL> 
                    </DIV></DIV><config-number title="线条宽度" :value.sync="theme.lineWidth"></config-number> 
                  <config-number title="图形描边" :value.sync="theme.symbolBorderWidth"></config-number> 
                  <config-number title="图形大小" 
:value.sync="theme.symbolSize"></config-number>                   
<DIV class="form-group">
<DIV class="col-sm-3"><LABEL class="control-label">图形形状</LABEL>                  
   </DIV>
<DIV class="col-sm-12">
<DIV class="row space-row">
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolCircle" type="radio" value="circle" 
@change="updateSymbol('circle')">                           <LABEL for="symbolCircle">圆形</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolCircleE" type="radio" 
checked="" value="circle" @change="updateSymbol('emptyCircle')">                 
          <LABEL for="symbolCircleE">空心圆形</LABEL>                         </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolRect" type="radio" value="rect" 
@change="updateSymbol('rect')">                           <LABEL for="symbolRect">方形</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolRectE" type="radio" value="rect" 
@change="updateSymbol('emptyRect')">                           <LABEL for="symbolRectE">空心方形</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolRoundRect" type="radio" 
value="roundRect" @change="updateSymbol('roundRect')">                           
<LABEL for="symbolRoundRect">圆角矩形</LABEL>                         </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolRoundRectE" type="radio" 
value="roundRect" @change="updateSymbol('emptyRoundRect')">                      
     <LABEL for="symbolRoundRectE">空心圆角矩形</LABEL>                         </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolTri" type="radio" value="triangle" 
@change="updateSymbol('triangle')">                           <LABEL for="symbolTri">三角形</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolTriE" type="radio" value="triangle" 
@change="updateSymbol('emptyTriangle')">                           <LABEL for="symbolTriE">空心三角形</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolDiamond" type="radio" 
value="diamond" @change="updateSymbol('diamond')">                           
<LABEL for="symbolDiamond">菱形</LABEL>                         </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolDiamondE" type="radio" 
value="diamond" @change="updateSymbol('emptyDiamond')">                          
 <LABEL for="symbolDiamondE">空心菱形</LABEL>                         </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolPin" type="radio" value="pin" 
@change="updateSymbol('pin')">                           <LABEL 
for="symbolPin">水滴</LABEL>                         </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolPinE" type="radio" value="pin" 
@change="updateSymbol('emptyPin')">                           <LABEL for="symbolPinE">空心水滴</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolArrow" type="radio" value="arrow" 
@change="updateSymbol('arrow')">                           <LABEL for="symbolArrow">箭头</LABEL> 
                        </DIV>
<DIV class="col-sm-6"><INPUT name="symbol" id="symbolArrowE" type="radio" value="arrow" 
@change="updateSymbol('emptyArrow')">                           <LABEL for="symbolArrowE">空心箭头</LABEL> 
                        </DIV></DIV></DIV></DIV></FORM></DIV></DIV></DIV></DIV><!-- end of acc-line --> 
        
<DIV class="panel-group" id="acc-k">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="k" href="https://echarts.apache.org/zh/theme-builder.html#acc-k-body" 
data-toggle="collapse" data-parent="#acc-k">K 线图</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-k-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="阳线填充" :color.sync="theme.kColor"></config-color> 
                  <config-color title="阴线填充" 
:color.sync="theme.kColor0"></config-color>                   <config-color 
title="阳线描边" :color.sync="theme.kBorderColor"></config-color>                   
<config-color title="阴线描边" :color.sync="theme.kBorderColor0"></config-color>     
              <config-number title="描边宽度" 
:value.sync="theme.kBorderWidth"></config-number>                 
</FORM></DIV></DIV></DIV></DIV><!-- end of acc-k -->         
<DIV class="panel-group" id="acc-graph">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="graph" href="https://echarts.apache.org/zh/theme-builder.html#acc-graph-body" 
data-toggle="collapse" data-parent="#acc-graph">力导图</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-graph-body">
<DIV class="panel-body">
<FORM class="form-horizontal"><config-color title="连线" :color.sync="theme.graphLineColor"></config-color> 
                  <config-number title="连线宽度" 
:value.sync="theme.graphLineWidth"></config-number>                 
</FORM></DIV></DIV></DIV></DIV><!-- end of acc-graph -->         
<DIV class="panel-group" id="acc-about">
<DIV class="panel panel-default">
<DIV class="panel-heading">
<H4 class="panel-title"><A title="graph" href="https://echarts.apache.org/zh/theme-builder.html#acc-about-body" 
data-toggle="collapse" data-parent="#acc-about">关于</A></H4></DIV>
<DIV class="panel-collapse collapse" id="acc-about-body">
<DIV class="panel-body">                项目源码：<A href="https://github.com/Ovilia/ECharts-Theme-Builder" 
target="_blank">GitHub</A>               </DIV></DIV></DIV></DIV><!-- end of acc-about --> 
      </DIV><!-- end of left -->       
<DIV class="col-md-9 col-sm-8 chart-container scroll-content" v-bind:style="{ backgroundColor: chartDisplay.background, backgroundImage: themeName == 'halloween' ? 'url(img/pumpkin.png)' : 'none'}">
<H3 v-bind:style="{ color: chartDisplay.title }">示例预览</H3>
<DIV class="row">
<DIV class="ec-container col-md-6" v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12]">
<DIV class="ec-panel"></DIV></DIV></DIV></DIV><!-- end of chart panel -->     
</DIV>
<DIV tabindex="-1" class="modal fade" id="download-modal" role="dialog">
<DIV class="modal-dialog">
<DIV class="modal-content">
<DIV class="modal-header"><BUTTON class="close" aria-label="Close" type="button" 
data-dismiss="modal"><SPAN aria-hidden="true">×</SPAN></BUTTON>             
<H4 class="modal-title">帮助</H4></DIV>
<DIV class="modal-body">
<H4>主题在线构建工具是什么？</H4>
<P>“主题”是 ECharts 图表的风格抽象，用于统一多个图表的风格样式。使用主题在线构建工具，可以快速直观地生成主题配置文件，并在 ECharts 
中使用自定义的主题样式。</P>
<P>在此主题的基础上，你仍然可以使用 <CODE>setOption</CODE> 覆盖或设置主题样式。</P>
<P>ECharts 官方提供 
<CODE>default</CODE>、<CODE>infographic</CODE>、<CODE>shine</CODE>、<CODE>roma</CODE>、<CODE>macarons</CODE>、<CODE>vintage</CODE> 
等主题，可供<A href="http://echarts.baidu.com/download-theme.html" 
target="_blank">下载</A>使用。</P>
<H4>导入、导出</H4>
<P>为了便于二次修改，我们的主题构建工具支持导入、导出配置项，导出的 JSON 文件仅用于在本工具中导入使用，而不能直接作为主题在 ECharts 
中注册。</P></DIV>
<DIV class="modal-footer"><BUTTON class="btn btn-default" type="button" 
data-dismiss="modal">关闭</BUTTON>           </DIV></DIV></DIV></DIV><!-- end of modal --> 
    
<DIV tabindex="-1" class="modal fade" id="download-js-modal" role="dialog">
<DIV class="modal-dialog">
<DIV class="modal-content">
<DIV class="modal-header"><BUTTON class="close" aria-label="Close" type="button" 
data-dismiss="modal"><SPAN aria-hidden="true">×</SPAN></BUTTON>             
<H4 class="modal-title">主题下载</H4></DIV>
<DIV class="modal-body"><!-- tab nav -->             
<UL class="nav nav-tabs" role="tablist">
  <LI class="active" role="presentation"><A role="tab" href="https://echarts.apache.org/zh/theme-builder.html#modal-js" 
  data-toggle="tab">JS 版本                 </A></LI>
  <LI role="presentation"><A role="tab" href="https://echarts.apache.org/zh/theme-builder.html#modal-json" 
  data-toggle="tab">JSON 版本                 </A></LI></UL><!-- tab content -->     
        
<DIV class="tab-content">
<DIV class="tab-pane active" id="modal-js" role="tabpanel">
<OL id="how-to-use-js">
  <LI><SPAN v-if="downloadable">下载或</SPAN>复制以下的主题保存至 <CODE>*.js</CODE> 文件；</LI>
  <LI>将该文件在 HTML 中引用；</LI>
  <LI>使用 <CODE>echarts.init(dom, '{{ themeName || 'customed' }}')</CODE> 
  创建图表，第二个参数即为 <CODE>*.js</CODE> 文件中注册的主题名字。</LI></OL>
<DIV class="code-btn">
<DIV class="btn-group" role="group"><A class="btn btn-sm btn-primary" @click="downloadThemeJs()" 
v-if="downloadable">下载</A>                     <A class="btn btn-sm btn-default" 
@click="copyThemeJs()">复制</A>                   </DIV><LABEL id="copy-js-success">已复制到剪贴板，请保存至 
<CODE>*.js</CODE> 文件</LABEL>                   <LABEL 
id="copy-js-fail">请使用<KBD>{{ copyKbd }}</KBD> + <KBD>s</KBD>复制，并保存至 
<CODE>*.js</CODE> 文件</LABEL>                 </DIV>
<PRE>                  <CODE class="javascript" id="js-code"></CODE>
                </PRE></DIV>
<DIV class="tab-pane" id="modal-json" role="tabpanel">
<OL id="how-to-use-json">
  <LI><SPAN v-if="downloadable">下载或</SPAN>复制以下的主题保存至 <CODE>*.json</CODE> 
文件；</LI>
  <LI>读取该 JSON 文件，并使用 <CODE>obj = JSON.parse(data)</CODE> 将其转换成对象；</LI>
  <LI>调用 <CODE>echarts.registerTheme('{{ themeName || 'customed' }}', 
  obj)</CODE> 注册主题；</LI>
  <LI>使用 <CODE>echarts.init(dom, '{{ themeName || 'customed' }}')</CODE> 
  创建图表，第二个参数即为刚才注册的主题名字。</LI></OL>
<DIV class="code-btn">
<DIV class="btn-group" role="group"><A class="btn btn-sm btn-primary" @click="downloadThemeJson()" 
v-if="downloadable">下载</A>                     <A class="btn btn-sm btn-default" 
@click="copyThemeJson()">复制</A>                   </DIV><LABEL id="copy-json-success">已复制到剪贴板，请保存至 
<CODE>*.json</CODE> 文件</LABEL>                   <LABEL 
id="copy-json-fail">请使用<KBD>{{ copyKbd }}</KBD> + <KBD>s</KBD>复制，并保存至 
<CODE>*.json</CODE> 文件</LABEL>                 </DIV>
<PRE>                  <CODE class="json" id="json-code"></CODE>
                </PRE></DIV></DIV></DIV>
<DIV class="modal-footer"><BUTTON class="btn btn-default" type="button" 
data-dismiss="modal">关闭</BUTTON>           </DIV></DIV></DIV></DIV><!-- end of modal --> 
  </DIV></DIV>
<SCRIPT src="zidingyi_files/echarts.min.js"></SCRIPT>
 
<SCRIPT src="zidingyi_files/lodash.min.js"></SCRIPT>
 
<SCRIPT src="zidingyi_files/bootstrap-colorpicker.min.js"></SCRIPT>
 
<SCRIPT src="zidingyi_files/vue.min.js"></SCRIPT>
 
<SCRIPT src="zidingyi_files/highlight.pack.min.js"></SCRIPT>
 
<SCRIPT src="zidingyi_files/FileSaver.min.js"></SCRIPT>
 
<SCRIPT src="zidingyi_files/app.min.js"></SCRIPT>
 </DIV></DIV>
<SCRIPT src="zidingyi_files/bootstrap.min.js" type="text/javascript"></SCRIPT>

<SCRIPT src="zidingyi_files/common.js" type="text/javascript"></SCRIPT>

<SCRIPT type="text/javascript">document.getElementById('nav-resources').className = 'active';</SCRIPT>
<!-- Baidu Tongji-->
<SCRIPT type="text/javascript">var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");

hm.src = "https://hm.baidu.com/hm.js?54b918eee37cb8a7045f0fd0f0b24395";

var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);
})();
</SCRIPT>
<!-- Google Analytics-->
<SCRIPT src="zidingyi_files/js.js" type="text/javascript" async=""></SCRIPT>

<SCRIPT type="text/javascript">window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-141228404-1');</SCRIPT>
</BODY></HTML>
