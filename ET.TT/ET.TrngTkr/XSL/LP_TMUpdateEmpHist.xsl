<xsl:stylesheet version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.Sharepoint.WebControls">
  <xsl:output method="html" indent="no" />
  <xsl:param name="PreviousLinkText">Previous</xsl:param>
  <xsl:param name="NextLinkText">Next</xsl:param>
  <xsl:param name="EditViewText">Edit View</xsl:param>
  <xsl:param name="AscendingText">Ascending</xsl:param>
  <xsl:param name="DescendingText">Descending</xsl:param>
  <xsl:param name="RetrieveDataText">Retrieve Data</xsl:param>
  <xsl:param name="ActionsText">Actions</xsl:param>
  <xsl:param name="FilterNameText">Filter name</xsl:param>
  <xsl:param name="OperatorText">Operator</xsl:param>
  <xsl:param name="AddText">Add</xsl:param>
  <xsl:param name="CurrentLCID">1033</xsl:param>
  <xsl:param name="OpenMenuToolTip">Open Menu</xsl:param>
  <xsl:param name="DataTableSummary">Entity Summary</xsl:param>
  <xsl:param name="SelectionRadioButtonToolTip">Pick Item</xsl:param>
  <xsl:param name="DownloadStreamText">Click here to download</xsl:param>
  <xsl:param name="IsRTL">
  </xsl:param>
  <xsl:param name="dvt_apos">'</xsl:param>
  <xsl:param name="dvt_adhocmode">sort</xsl:param>
  <xsl:param name="ClickThroughUrl" />
  <xsl:param name="DownloadExternalDataUrl" />
  <xsl:param name="dvt_url" />
  <xsl:param name="jsMenuApplication" />
  <xsl:param name="jsMenuEntityNamespace" />
  <xsl:param name="jsMenuEntityName" />
  <xsl:param name="jsMenuLoadingMessage" />
  <xsl:param name="dvt_1_automode">0</xsl:param>
  <xsl:param name="filterParam" />
  <xsl:param name="dvt_firstrow">1</xsl:param>
  <xsl:param name="dvt_nextpagedata" />
  <xsl:param name="IsMenuVisible" />
  <xsl:param name="IsEditViewVisible" />
  <xsl:param name="dvt_partguid" />
  <xsl:param name="ColumnKey">Kunnr</xsl:param>
  <xsl:param name="dvt_1_form_selectkey" />
  <xsl:param name="dvt_sortdir">ascending</xsl:param>
  <xsl:param name="dvt_sortfield" />
  <xsl:param name="dvt_emptytext">
  </xsl:param>
  <xsl:param name="dvt_filterfields" />
  <xsl:param name="ColName_0">RecordId</xsl:param>
  <xsl:param name="ColName_1">TitleOfEvent</xsl:param>
  <xsl:param name="ColName_2">DateCompleted</xsl:param>
  <xsl:template name="dvt.headerfield">
    <xsl:param name="fieldname" />
    <xsl:param name="fieldtitle" />
    <xsl:param name="displayname" />
    <xsl:param name="fieldtype">0</xsl:param>
    <xsl:variable name="sortfield">
      <xsl:choose>
        <xsl:when test="substring($fieldname, 1, 1) = '@'">
          <xsl:value-of select="substring($fieldname, 2)" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$fieldname" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="linkdir">
      <xsl:choose>
        <xsl:when test="$dvt_sortfield = $sortfield and $dvt_sortdir = 'ascending'">descending</xsl:when>
        <xsl:otherwise>ascending</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="sortText">
      <xsl:choose>
        <xsl:when test="$linkdir='descending'">' + 'descending' + '</xsl:when>
        <xsl:otherwise>' + 'ascending' + '</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="separator" select="' '" />
    <xsl:variable name="connector" select="';'" />
    <xsl:variable name="filterString" select="concat($displayname,$separator,$fieldname,$separator,$fieldtype,$connector,$CurrentLCID,$separator,$dvt_partguid)" />
    <table CtxNum="1" cellspacing="0" class="ms-unselectedtitle">
      <xsl:if test="$fieldname">
        <xsl:attribute name="onmouseover">OnMouseOverAdHocFilter(this, '<xsl:value-of select="$filterString" />')</xsl:attribute>
      </xsl:if>
      <tr>
        <td width="100%" class="ms-vb" nowrap="">
          <xsl:choose>
            <xsl:when test="$fieldname">
              <a>
                <xsl:attribute name="href">javascript: <xsl:value-of select="ddwrt:GenFireServerEvent(concat('dvt_sortfield={',$sortfield,'};dvt_sortdir={',$sortText,'}'))" />;</xsl:attribute>
                <xsl:value-of select="$fieldtitle" />
                <xsl:if test="$dvt_sortfield = $sortfield">
                  <xsl:choose>
                    <xsl:when test="$dvt_sortdir = 'ascending'">
                      <img border="0" alt="{$AscendingText}" src="{ddwrt:FieldSortImageUrl('Desc')}" />
                    </xsl:when>
                    <xsl:when test="$dvt_sortdir = 'descending'">
                      <img border="0" alt="{$DescendingText}" src="{ddwrt:FieldSortImageUrl('Asc')}" />
                    </xsl:when>
                  </xsl:choose>
                </xsl:if>
              </a>
              <xsl:if test="contains($dvt_filterfields, concat($fieldname, ';' ))">
                <img src="/_layouts/images/filter.gif" border="0" alt="" />
              </xsl:if>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$fieldtitle" />
            </xsl:otherwise>
          </xsl:choose>
        </td>
        <td>
          <img src="/_layouts/images/blank.gif" width="13" style="visibility: hidden" alt="" />
        </td>
      </tr>
    </table>
  </xsl:template>
  <xsl:template match="/">
    <xsl:call-template name="dvt_1" />
  </xsl:template>
  <xsl:template name="dvt_1">
    <xsl:variable name="dvt_StyleName">Table</xsl:variable>
    <xsl:variable name="Rows" select="/dsQueryResponse/NewDataSet/Row" />
    <xsl:variable name="dvt_RowCount" select="count($Rows)" />
    <xsl:variable name="RowLimit" select="20" />
    <xsl:variable name="FirstRow" select="$dvt_firstrow" />
    <xsl:variable name="LastRow">
      <xsl:choose>
        <xsl:when test="($FirstRow + $RowLimit - 1) &gt; $dvt_RowCount">
          <xsl:value-of select="$dvt_RowCount" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$FirstRow + $RowLimit - 1" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:call-template name="dvt_1.commandheader">
      <xsl:with-param name="FirstRow" select="$FirstRow" />
      <xsl:with-param name="LastRow" select="$LastRow" />
      <xsl:with-param name="RowLimit" select="$RowLimit" />
      <xsl:with-param name="dvt_RowCount" select="$dvt_RowCount" />
    </xsl:call-template>
    <table id="BdwpRows" border="0" width="100%" cellpadding="2" cellspacing="0">
      <xsl:attribute name="summary">
        <xsl:value-of select="$DataTableSummary" />
      </xsl:attribute>
      <tr valign="top">
        <th class="ms-vh" width="1" />
        <th class="ms-vh" align="left">
          <xsl:call-template name="dvt.headerfield" ddwrt:atomic="1">
            <xsl:with-param name="fieldname">@RecordId</xsl:with-param>
            <xsl:with-param name="fieldtitle">
              <xsl:value-of select="$ColName_0" />
            </xsl:with-param>
            <xsl:with-param name="displayname">
              <xsl:value-of select="$ColName_0" />
            </xsl:with-param>
            <xsl:with-param name="fieldtype">number</xsl:with-param>
          </xsl:call-template>
        </th>
        <th class="ms-vh" align="left">
          <xsl:call-template name="dvt.headerfield" ddwrt:atomic="1">
            <xsl:with-param name="fieldname">@TitleOfEvent</xsl:with-param>
            <xsl:with-param name="fieldtitle">
              <xsl:value-of select="$ColName_1" />
            </xsl:with-param>
            <xsl:with-param name="displayname">
              <xsl:value-of select="$ColName_1" />
            </xsl:with-param>
            <xsl:with-param name="fieldtype">text</xsl:with-param>
          </xsl:call-template>
        </th>
        <th class="ms-vh" align="left">
          <xsl:call-template name="dvt.headerfield" ddwrt:atomic="1">
            <xsl:with-param name="fieldname">@DateCompleted</xsl:with-param>
            <xsl:with-param name="fieldtitle">
              <xsl:value-of select="$ColName_2" />
            </xsl:with-param>
            <xsl:with-param name="displayname">
              <xsl:value-of select="$ColName_2" />
            </xsl:with-param>
            <xsl:with-param name="fieldtype">datetime</xsl:with-param>
          </xsl:call-template>
        </th>
      </tr>
      <xsl:call-template name="dvt_1.body">
        <xsl:with-param name="Rows" select="$Rows" />
        <xsl:with-param name="FirstRow" select="$dvt_firstrow" />
        <xsl:with-param name="LastRow" select="$LastRow" />
      </xsl:call-template>
    </table>
  </xsl:template>
  <xsl:template name="dvt_1.body">
    <xsl:param name="Rows" />
    <xsl:param name="FirstRow" />
    <xsl:param name="LastRow" />
    <xsl:for-each select="$Rows">
      <xsl:if test="position() &gt;= $FirstRow and position() &lt;= $LastRow">
        <xsl:call-template name="dvt_1.rowview" />
      </xsl:if>
    </xsl:for-each>
  </xsl:template>
  <xsl:template name="dvt_1.rowview">
    <tr>
      <td class="ms-vb" width="1">
        <xsl:choose>
          <xsl:when test="$dvt_1_automode = '1'">
            <xsl:call-template name="dvt_1.automode">
              <xsl:with-param name="KeyField">
              </xsl:with-param>
              <xsl:with-param name="KeyValue" select="@*[name()=$ColumnKey]" />
              <xsl:with-param name="Mode">select</xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <span ddwrt:amkeyfield="" ddwrt:amkeyvalue="''" ddwrt:ammode="select" />
          </xsl:otherwise>
        </xsl:choose>
      </td>
      <td class="ms-vb">
        <xsl:attribute name="style">
          <xsl:choose>
            <xsl:when test="$dvt_1_form_selectkey = @*[name()=$ColumnKey]">color:blue</xsl:when>
            <xsl:otherwise />
          </xsl:choose>
        </xsl:attribute>
        <a onclick="OpenPopUpPage('../Lists/TrainingHistory/editmanager.aspx?ID={@BdcIdentity}', null, null, null, null);" href="#">
          <xsl:value-of select="@RecordId" />
        </a>
      </td>
      <td class="ms-vb">
        <xsl:attribute name="style">
          <xsl:choose>
            <xsl:when test="$dvt_1_form_selectkey = @*[name()=$ColumnKey]">color:blue</xsl:when>
            <xsl:otherwise />
          </xsl:choose>
        </xsl:attribute>
        <xsl:variable name="fieldValue">
          <xsl:call-template name="LFtoBR">
            <xsl:with-param name="input">
              <xsl:value-of select="@TitleOfEvent" />
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <xsl:copy-of select="$fieldValue" />
      </td>
      <td class="ms-vb">
        <xsl:attribute name="style">
          <xsl:choose>
            <xsl:when test="$dvt_1_form_selectkey = @*[name()=$ColumnKey]">color:blue</xsl:when>
            <xsl:otherwise />
          </xsl:choose>
        </xsl:attribute>
        <xsl:value-of select="ddwrt:FormatDateTimeUsingCurrentContext(string(@DateCompleted))" />
      </td>
    </tr>
  </xsl:template>
  <xsl:template name="dvt_1.navigation">
    <xsl:param name="FirstRow" />
    <xsl:param name="LastRow" />
    <xsl:param name="RowLimit" />
    <xsl:param name="dvt_RowCount" />
    <xsl:variable name="PrevRow">
      <xsl:choose>
        <xsl:when test="$FirstRow - $RowLimit &lt; 1">1</xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$FirstRow - $RowLimit" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="NextRow">
      <xsl:choose>
        <xsl:when test="$LastRow &gt;= $dvt_RowCount">
          <xsl:value-of select="$FirstRow" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$LastRow + 1" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <asp:Literal id="PagerControl" runat="server">
      <xsl:choose>
        <xsl:when test="$dvt_RowCount = 0">
          <xsl:value-of select="$dvt_emptytext" />
        </xsl:when>
        <xsl:when test="$FirstRow = 1 and $LastRow = $dvt_RowCount">
        </xsl:when>
        <xsl:otherwise>
          <xsl:if test="$FirstRow != 1">
            <a>
              <xsl:attribute name="href">javascript: <xsl:value-of select="ddwrt:GenFireServerEvent(concat('dvt_firstrow={',$PrevRow,'}'))" />;</xsl:attribute>
              <img src="{ddwrt:PagingImageUrl('Previous')}" border="0" alt="{$PreviousLinkText}" />
            </a>
            <xsl:text disable-output-escaping="yes" ddwrt:nbsp-preserve="yes">&amp;nbsp;</xsl:text>
          </xsl:if>
          <xsl:value-of select="$FirstRow" /> - <xsl:value-of select="$LastRow" /><xsl:if test="$LastRow != $dvt_RowCount"><xsl:text disable-output-escaping="yes" ddwrt:nbsp-preserve="yes">&amp;nbsp;</xsl:text><a><xsl:attribute name="href">javascript: <xsl:value-of select="ddwrt:GenFireServerEvent(concat('dvt_firstrow={',$NextRow,'}'))" />;</xsl:attribute><img src="{ddwrt:PagingImageUrl('Next')}" border="0" alt="{$NextLinkText}" /></a></xsl:if></xsl:otherwise>
      </xsl:choose>
      <xsl:text disable-output-escaping="yes" ddwrt:nbsp-preserve="yes">&amp;nbsp;</xsl:text>
      <xsl:text disable-output-escaping="yes" ddwrt:nbsp-preserve="yes">&amp;nbsp;</xsl:text>
      <xsl:if test="$IsEditViewVisible">
        <a href="{$dvt_url}">
          <xsl:value-of select="$EditViewText" />
        </a>
        <xsl:text disable-output-escaping="yes" ddwrt:nbsp-preserve="yes">&amp;nbsp;</xsl:text>
        <xsl:text disable-output-escaping="yes" ddwrt:nbsp-preserve="yes">&amp;nbsp;</xsl:text>
      </xsl:if>
    </asp:Literal>
  </xsl:template>
  <xsl:template name="dvt_1.commandheader">
    <xsl:param name="FirstRow" />
    <xsl:param name="LastRow" />
    <xsl:param name="RowLimit" />
    <xsl:param name="dvt_RowCount" />
    <div>
      <xsl:call-template name="dvt_1.navigation">
        <xsl:with-param name="FirstRow" select="$FirstRow" />
        <xsl:with-param name="LastRow" select="$LastRow" />
        <xsl:with-param name="RowLimit" select="$RowLimit" />
        <xsl:with-param name="dvt_RowCount" select="$dvt_RowCount" />
      </xsl:call-template>
      <asp:PlaceHolder id="ActionBarTable" runat="server">
        <table class="ms-menutoolbar" cellpadding="2" cellspacing="0" border="0" width="100%">
          <tr>
            <td class="ms-toolbar" style="padding-left:3px;text-align:left" nowrap="true">
              <xsl:value-of select="$ActionsText" />
            </td>
            <td class="ms-toolbar" style="padding-right:3px;text-align:right" nowrap="true">
              <xsl:value-of select="$EditViewText" />
            </td>
          </tr>
        </table>
      </asp:PlaceHolder>
      <asp:PlaceHolder id="SearchTable" runat="server">
        <table width="100%" style="background-color:#efefd6">
          <tr class="ms-vb">
            <td>
              <select>
                <option>
                  <xsl:value-of select="$FilterNameText" />
                </option>
              </select>
            </td>
            <td>
              <select>
                <option>
                  <xsl:value-of select="$OperatorText" />
                </option>
              </select>
            </td>
            <td width="100%" nowrap="true">
              <input class="ms-input" style="width:100%" />
            </td>
            <td valign="middle">
              <a href="#">
                <xsl:value-of select="$AddText" />
              </a>
            </td>
          </tr>
        </table>
        <table width="100%" style="background-color:#efefd6">
          <tr>
            <td style="width:16pt;" valign="middle">
              <xsl:choose>
                <xsl:when test="$IsRTL">
                  <img src="/_layouts/images/icongo01RTL.gif" border="0" />
                </xsl:when>
                <xsl:otherwise>
                  <img src="/_layouts/images/icongo01.gif" border="0" />
                </xsl:otherwise>
              </xsl:choose>
            </td>
            <td class="ms-vb" valign="middle">
              <a href="#">
                <xsl:value-of select="$RetrieveDataText" />
              </a>
            </td>
          </tr>
        </table>
      </asp:PlaceHolder>
    </div>
  </xsl:template>
  <xsl:template name="dvt_1.automode">
    <xsl:param name="KeyField" />
    <xsl:param name="KeyValue" />
    <xsl:param name="Mode" />
    <table border="0" cellspacing="0" cellpadding="1">
      <tr>
        <xsl:choose>
          <xsl:when test="$Mode = 'edit'">
            <td class="ms-vb" />
            <td class="ms-vb" />
            <td class="ms-vb" />
          </xsl:when>
          <xsl:when test="$Mode = 'insert'">
            <td class="ms-vb" />
            <td class="ms-vb" />
            <td class="ms-vb" />
          </xsl:when>
          <xsl:otherwise>
            <td class="ms-vb" />
            <td class="ms-vb" />
            <td class="ms-vb" />
            <td class="ms-vb" />
            <td class="ms-vb">
              <a href="#">
                <xsl:attribute name="onclick">
                  <xsl:value-of select="ddwrt:GenFireServerEvent(concat('dvt_1_form_selectkey={',$KeyValue,'}'))" />; return false;</xsl:attribute>
                <xsl:choose>
                  <xsl:when test="$dvt_1_form_selectkey = @*[name()=$ColumnKey]">
                    <img border="0" style="cursor: hand" src="/_layouts/images/rbsel.gif">
                      <xsl:attribute name="alt">
                        <xsl:value-of select="$SelectionRadioButtonToolTip" />
                      </xsl:attribute>
                    </img>
                  </xsl:when>
                  <xsl:otherwise>
                    <img border="0" style="cursor: hand" src="/_layouts/images/rbunsel.gif">
                      <xsl:attribute name="alt">
                        <xsl:value-of select="$SelectionRadioButtonToolTip" />
                      </xsl:attribute>
                    </img>
                  </xsl:otherwise>
                </xsl:choose>
              </a>
            </td>
          </xsl:otherwise>
        </xsl:choose>
      </tr>
    </table>
  </xsl:template>
  <xsl:template name="formatString">
    <xsl:param name="stringvalue" />
    <xsl:param name="separator" />
    <xsl:variable name="curStr" select="substring-after($stringvalue, $separator)" />
    <xsl:choose>
      <xsl:when test="contains($curStr, $separator)">
        <xsl:value-of select="substring-before($stringvalue, $separator)" />
        <xsl:value-of select="ddwrt:UrlEncode(@*[name()=substring-before($curStr, $separator)])" />
        <xsl:call-template name="formatString">
          <xsl:with-param name="stringvalue" select="substring-after($curStr, $separator)" />
          <xsl:with-param name="separator" select="$separator" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$stringvalue" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="OpenActionsMenu">
    <xsl:param name="method" />
    <xsl:param name="id" />
    <xsl:param name="menuText" />
    <xsl:value-of select="$method" />
    <xsl:text>('</xsl:text>
    <xsl:value-of select="$jsMenuLoadingMessage" />
    <xsl:text>','</xsl:text>
    <xsl:value-of select="ddwrt:EcmaScriptEncode($menuText)" />
    <xsl:text>',false,'</xsl:text>
    <xsl:value-of select="$jsMenuApplication" />
    <xsl:text>','</xsl:text>
    <xsl:value-of select="$jsMenuEntityNamespace" />
    <xsl:text>','</xsl:text>
    <xsl:value-of select="$jsMenuEntityName" />
    <xsl:text>','</xsl:text>
    <xsl:value-of select="ddwrt:EcmaScriptEncode($id)" />
    <xsl:text>', event);</xsl:text>
  </xsl:template>
  <xsl:template name="_trimLF">
    <xsl:param name="input" />
    <xsl:choose>
      <xsl:when test="starts-with($input, '&#xA;')">
        <xsl:call-template name="_trimLF">
          <xsl:with-param name="input" select="substring($input, 2)" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="substring($input, string-length($input), 1) = '&#xA;'">
        <xsl:call-template name="_trimLF">
          <xsl:with-param name="input" select="substring($input, 1, string-length($input)-1)" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$input" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="_LFtoBRloop">
    <xsl:param name="input" />
    <xsl:variable name="beforeText" select="substring-before($input, '&#xA;')" />
    <xsl:choose>
      <xsl:when test="string-length($beforeText) = 0 and substring($input, 1, 1) != '&#xA;'">
        <xsl:value-of select="$input" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$beforeText" />
        <br />
        <xsl:call-template name="_LFtoBRloop">
          <xsl:with-param name="input" select="substring($input, string-length($beforeText)+2)" />
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="LFtoBR">
    <xsl:param name="input" />
    <xsl:choose>
      <xsl:when test="substring-before($input, '&#xA;') = ''">
        <xsl:value-of select="$input" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="_LFtoBRloop">
          <xsl:with-param name="input">
            <xsl:call-template name="_trimLF">
              <xsl:with-param name="input" select="translate($input, '&#xD;', '')" />
            </xsl:call-template>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>