<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

 

<%@ Register TagPrefix="WebPartPages"

    Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint,  Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">

</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
	<meta name="GENERATOR" content="Microsoft SharePoint" />
	<meta name="ProgId" content="SharePoint.WebPartPage.Document" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="CollaborationServer" content="SharePoint Team Web Site" />
	
	
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderSearchArea" runat="server">
	<WebPartPages:SPProxyWebPartManager runat="server" id="spproxywebpartmanager"></WebPartPages:SPProxyWebPartManager>	
	
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">

</asp:Content>
<%--Custom content starts here--%>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
<div id="mtt-MenuButtons">
	<a href="?role=emp" id="empButton" class="normal"><span>&nbsp;</span></a>
	<a href="?role=tmg" id="tmgButton" class="normal"><span>&nbsp;</span></a>
	<a href="?role=rmg" id="rmgButton" class="normal"><span>&nbsp;</span></a>
	<a href="?role=adm" id="admButton" class="normal"><span>&nbsp;</span></a>
</div>
<div id="mtt-Content">
	<div id="gettingStarted">
		<div class="title">
			<h2>Getting started with the Mandatory Training Tracker</h2>
		</div>
		<div class="content">
			
		<WebPartPages:WebPartZone id="g_7D5BADDC2AFF4CF1ACE318052D96E340" runat="server" title="Getting Started Zone"><ZoneTemplate>
<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{CBD6E686-D12B-4CCB-A01E-5E10628748B8}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title />
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>2</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_cbd6e686_d12b_4ccb_a01e_5e10628748b8</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor">../_catalogs/masterpage/ET.TrngTkr/html/GettingStarted.html</ContentLink>
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>
		</ZoneTemplate></WebPartPages:WebPartZone>
			
		</div>
	</div>
	<div id="empDiv">
		<div class="title">
			<h2>Employees: start here</h2>
		</div>
		<div class="content">
			<table width="100%">
				<tr>
					<td class="webparts">
						
					<WebPartPages:WebPartZone id="g_D804F9CF862E45CCBCB300A7D4C1B77F" runat="server" title="Employee Zone"><ZoneTemplate>
<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{D5FEEA76-0929-4FA9-AD7A-E3EC4C573718}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Content Editor</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>2</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_d5feea76_0929_4fa9_ad7a_e3ec4c573718</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2> 
   <a title="Click MTT User Guide to open a PDF file for the user guide." href="/sites/SharePointDesigner/test/SiteAssets/MTT_UserGuide.pdf" target="_blank">MTT User Guide</a></h2>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>
					</ZoneTemplate></WebPartPages:WebPartZone>
						
					</td>
				<td class="sub-menu">
					<a href="?role=emp&area=userguide" id="empDivLink0"><img src="../_catalogs/masterpage/ET.TrngTkr/images/EmpUserGuide.png" alt="Employee User Guide"/></a>
						<br/>
						<a href="?role=emp&area=printcert" id="empDivLink1"><img src="../_catalogs/masterpage/ET.TrngTkr/images/EmpCertificates.png" alt="Employee View/Print Certificates"/></a>
						<br/>
						<a href="?role=emp&area=trainhist" id="empDivLink2"><img src="../_catalogs/masterpage/ET.TrngTkr/images/EmpHistory.png" alt="Employee Training History"/></a>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div id="tmgDiv">
		<div class="title">
			<h2>Training Managers: start here</h2>
		</div>
		<div class="content">
			<table width="100%">
				<tr>
					<td class="webparts">
						
					<WebPartPages:WebPartZone id="g_1F438E2DD1B94CA9AFD8A736065FCFA1" runat="server" title="Training Manager Zone"><ZoneTemplate>
<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{57A664A7-C6B9-4319-9761-1A4AE6BFC814}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>MTT LP TM UG</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>2</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter>;;;;MTT Training Managers</IsIncludedFilter>
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_57a664a7_c6b9_4319_9761_1a4ae6bfc814</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2> 
   <a title="Click MTT Manager Guide to open a PDF file for the manager guide." href="/sites/SharePointDesigner/test/SiteAssets/MTTAdminGuide.pdf" target="_blank">MTT Manager Guide</a></h2>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>

<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{DD9E8D0C-6C9F-43CB-ABB0-502604FB6834}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Content Editor</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>4</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter>;;;;MTT Training Managers</IsIncludedFilter>
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_dd9e8d0c_6c9f_43cb_abb0_502604fb6834</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2>
   <a onclick="OpenPopUpPage(&#39;../Lists/TrainingHistory/AddManager.aspx&#39;, null, null, null, null);" href="#">Record employee attendance <xsl:value-of select="@RecordId"></xsl:value-of></a></h2>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>
					</ZoneTemplate></WebPartPages:WebPartZone>
						
					</td>
					<td class="sub-menu">
						<a href="?role=tmg&area=userguide" id="tmgDivLink0"><img src="../_catalogs/masterpage/ET.TrngTkr/images/TMUserGuide.png" alt="Training Manager User Guide"/></a><br/>
						<a href="?role=tmg&area=events" id="tmgDivLink1"><img src="../_catalogs/masterpage/ET.TrngTkr/images/TMEvents.png" alt="Training Manager Create/Update Events"/></a><br/>
						<a href="?role=tmg&area=enteratt" id="tmgDivLink2"><img src="../_catalogs/masterpage/ET.TrngTkr/images/TMAttendance.png" alt="Training Manager Record Employee Attendance"/></a>
						</td>
				</tr>
			</table>
		</div>
	</div>
	<div id="rmgDiv">
		<div class="title">
			<h2>Reporting Managers: start here</h2>
		</div>
		<div class="content">
			<table width="100%">
				<tr>
					<td class="webparts">
						
					<WebPartPages:WebPartZone id="g_EF0B977CCBDF4ADCB129ADDF2A7FD913" runat="server" title="Reporting Manager Zone"><ZoneTemplate>
<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{DC781E81-88DB-4D16-9F88-1BCE48FC9AA8}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Content Editor</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>2</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter>;;;;MTT Reporting Managers</IsIncludedFilter>
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_dc781e81_88db_4d16_9f88_1bce48fc9aa8</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2>
   <a title="Click MTT Manager Guide to open a PDF file for the manager guide." href="/sites/SharePointDesigner/test/SiteAssets/MTTAdminGuide.pdf" target="_blank">MTT Manager Guide</a></h2>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>

<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{B2F15350-7F6B-44DB-B2A6-6A023A525BCE}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>MTT LP reports</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>4</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter>;;;;MTT Reporting Managers</IsIncludedFilter>
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_b2f15350_7f6b_44db_b2a6_6a023a525bce</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2>​Reports placeholder</h2>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>
					</ZoneTemplate></WebPartPages:WebPartZone>
						
					</td>
					<td class="sub-menu">
							<a href="?role=rmg&area=userguide" id="rmgDivLink0"><img src="../_catalogs/masterpage/ET.TrngTkr/images/RMUserGuide.png" alt="Reporting Manager User Guide"/></a><br/>
						<a href="?role=rmg&area=reports" id="rmgDivLink1"><img src="../_catalogs/masterpage/ET.TrngTkr/images/RMReport.png" alt="Reporting Manager Report Name #1"/></a></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="admDiv">
		<div class="title">
			<h2>MTT Administrators: start here</h2>
		</div>
		<div class="content">
			<table width="100%">
				<tr>
					<td class="webparts">
						
					<WebPartPages:WebPartZone id="g_8DE1A42AADDB41E7A000E894F25E2CC7" runat="server" title="Admin Zone"><ZoneTemplate>
<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{F169D19B-4155-407D-87D9-166025704FC1}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Content Editor</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>2</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter>;;;;MTT Administrators</IsIncludedFilter>
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_f169d19b_4155_407d_87d9_166025704fc1</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2> 
   <a title="Click MTT Manager Guide to open a PDF file for the manager guide." href="/sites/SharePointDesigner/test/SiteAssets/MTTAdminGuide.pdf" target="_blank">MTT Administrator Guide</a></h2>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>

<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{3EA4B8E5-32EB-4D6A-AE6C-87AAC7F7DB09}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>MTT LP Admin New Org</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>4</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_3ea4b8e5_32eb_4d6a_ae6c_87aac7f7db09</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h2>     
   <a onclick="OpenPopUpPage(&#39;../lists/Organization/NewForm.aspx?IsDlg=1&#39;, null, null, null, null);" href="#">Add an organization     
    </a></h2>





]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>

<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{2A6C9C8A-B96F-4003-8722-3F49E9417A27}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>MTT LP reports</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>6</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter>;;;;MTT Administrators</IsIncludedFilter>
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_2a6c9c8a_b96f_4003_8722_3f49e9417a27</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<h1>​Reports placeholder</h1>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>
					</ZoneTemplate></WebPartPages:WebPartZone>
						
					</td>
					<td class="sub-menu">
						<a href="?role=adm&area=userguide" id="admDivLink0"><img src="../_catalogs/masterpage/ET.TrngTkr/images/AdmUserGuide.png" alt="Admin User Guide"/></a><br/>
						<a href="?role=adm&area=org" id="admDivLink1"><img src="../_catalogs/masterpage/ET.TrngTkr/images/AdmOrg.png" alt="Admin Create/Update Organizations"/></a><br/>
						<a href="?role=adm&area=reports" id="admDivLink2"><img src="../_catalogs/masterpage/ET.TrngTkr/images/AdmReports.png" alt="Admin Reports"/></a><br/>
						<a href="?role=adm&area=events" id="admDivLink3"><img src="../_catalogs/masterpage/ET.TrngTkr/images/AdmEvents.png" alt="Admin Training Events"/></a></td>
			</tr>
			</table>
		</div>
	</div>
</div>
<!--start code here-->
<script type="text/javascript">
	SP.SOD.executeFunc("sp.js", null, LoadMTTScripts);
	function LoadMTTScripts() {
		var currWebUrl = _spPageContextInfo.webServerRelativeUrl,
			css = document.createElement('link'),
			js = document.createElement('script'),
			js2 = document.createElement('script');

		css.rel = "stylesheet";
		css.type = "text/css";
		css.href = currWebUrl + "/_catalogs/masterpage/ET.TrngTkr/css/LandingPage.css";
		js.src = currWebUrl + "/_catalogs/masterpage/ET.TrngTkr/js/LandingPage.js";
		js2.src = currWebUrl + "/_catalogs/masterpage/ET.TrngTkr/js/LandingPageNav.js";

		document.getElementsByTagName('head')[0].appendChild(css);
		document.getElementsByTagName('body')[0].appendChild(js);
		document.getElementsByTagName('body')[0].appendChild(js2);
	}
</script>
</asp:Content>

