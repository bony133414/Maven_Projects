<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<html>

<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Shell EVE - Landing Page</title>

<c:set var="context" value="${pageContext.request.contextPath}" />

<link href='${context}/resources/assets/css/style/bootstrap.min.css'
	rel="stylesheet" />
<link href='${context}/resources/assets/css/style/bootstrap-theme.css'
	rel="stylesheet" />
<link href='${context}/resources/assets/css/style/bootstrap-switch.css'
	rel="stylesheet" />
<link href='${context}/resources/assets/css/style/index.css'
	rel="stylesheet" />
<link href='${context}/resources/assets/css/style/header.css'
	rel="stylesheet" />
<link href='${context}/resources/assets/css/style/latestDocuments.css'
	rel="stylesheet" />
<link href='${context}/resources/assets/css/style/summary.css'
	rel="stylesheet" />
<script src="https://rtsphome.m.shlrtsp.com:3443/logout/logout.js" type="text/javascript">&nbsp;</script>
<script src="https://rtsphome.m.shlrtsp.com:3443/logout/jquery-min.js" type="text/javascript">&nbsp;</script>
<script src="https://rtsphome.m.shlrtsp.com:3443/logout/jquery.modal.js" type="text/javascript">&nbsp;</script>
<link rel="stylesheet" href="https://rtsphome.m.shlrtsp.com:3443/logout/jquery.modal.css" type="text/css"
	media="screen" />
<script type="text/javascript">
			function logout(lang,logout_url){
				var webSystem = new WebSystem(lang, "LandingPage", logout_url);
				webSystem.logout();
			}
		</script>
<script src='${context}/resources/assets/js/scripts/jquery-1.9.1.js'
	type="text/javascript"></script>
<script src='${context}/resources/assets/js/scripts/bootstrap.min.js'
	type="text/javascript"></script>
<script src='${context}/resources/assets/js/scripts/bootstrap-switch.js'
	type="text/javascript"></script>
<%-- <script src='${context}/resources/assets/js/scripts/common.js'
		type="text/javascript"></script> --%>



<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src='${context}/resources/assets/js/scripts/html5shiv.min.js' type="text/javascript"></script>
    <script src='${context}/resources/assets/js/scripts/respond.min.js' type="text/javascript"></script>
    <![endif]-->


<link rel="icon"
	href="${context}/resources/assets/images/shell_logo.png"
	type="image/gif" sizes="16x16">

</head>


<body>

	<link href='${context}/resources/assets/css/style/leftNav.css'
		rel="stylesheet" />
	<div class="leftNav hidden-xs"
		style="text-align: center; margin: 20px 0px 0px 0px">
		<!-- <div class="leftTop"> -->
		<table class="centerTable leftTable" style="color: #404040;">
			<tr>
				<!-- <td  style="cursor: pointer;"  onclick="goBack();"> -->
				<td><img
					src="${context}/resources/assets/images/shell_logo.png" alt="Logo"
					width="82" height="76" style="margin: 0px 10px 0px 20px"></td>
				<!-- </tr>
  	<tr> -->
				<td>&nbsp;</td>
			</tr>
		</table>
		<!-- </div> -->
		<div class="leftBottom">
			<ol id="dmApps" class="selectable">


			</ol>
		</div>
	</div>

	<div id="pageContainer" class="rightNav">


		<link href='${context}/resources/assets/css/style/main.css'
			rel="stylesheet" />

		<script type="text/javascript">

function searchAjax(ouvalue) {
	
	$.ajax({
		type : "GET",
		data : ouvalue,
		url : "${pageContext.request.contextPath}/storeOUCode/"+ouvalue,
		success : function(data) {
			console.log("SUCCESS: ", data);
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	});
}
function appendUrl(urlvalue){
	
	var singleOUvalue = "${singleouVal}"; 
	if ( singleOUvalue != ""){
		var ouvalue = "${singleOuMap}";
		var appendedUrl = urlvalue+"?OU="+ouvalue;
		location.href = appendedUrl;
	}	else {
		var ouvalue = $('#OUCode').val();
		var appendedUrl = urlvalue+"?OU="+ouvalue;
		location.href = appendedUrl;
	}	
}

</script>
		<style type="text/css">
#userProfileImage {
	height: 35px;
	width: 35px;
}

#userName {
	color: #fff;
	float: right;
	line-height: 2.5;
}

#userSettings {
	cursor: p
}

.popover-content a, p {
	color: black;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	text-decoration: none;
}

.popover-content table tr td {
	padding-top: 2px;
}

.popover-content table tr {
	cursor: pointer;
}

.popover-content table tr a:HOVER, .popover-content table tr:HOVER {
	color: #EA232A;
	text-decoration: none;
}
</style>


		<!-- Modal -->
		<div class="modal fade hp-modal" id="privacyPolicyModal"
			style="display: none" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Privacy Policy</h4>
					</div>
					<div class="modal-body">Text to be provided at a later time.
					</div>
					<div class="modal-footer hp-modal">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>



		<div class="modal fade hp-modal" id="termsAndConditionModal"
			style="display: none" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Terms & Conditions</h4>
					</div>
					<div class="modal-body">Text to be provided at a later time.
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>




		<div class="navbar navbar-default navbar-fixed-top hp-navbar"
			role="navigation">
			<div class="container-fluid" style="padding-right: 30px">
				<div class="navbar-header hp-navbar-header">
					<!--  <img id="userProfileImage" src="${context}/resources/assets/images/user-logo.png" class="imagePopup img-circle pull-left"></img>  -->

					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#main-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>

					<a class="navbar-brand hidden-sm hidden-md hidden-lg"><img
						src="${context}/resources/assets/images/shell_logo.png"
						style="width: 35px; height: 35px; margin-right: 10px;">Retailer
						Transaction Settlement Platform</a>

				</div>
				<div id="main-collapse" class="navbar-collapse collapse">
					<ul class="nav navbar-nav hp-nav">

						<li class="visible-xs logoutCss"><c:forEach var="report"
								items="${reportList}">
								<c:if test="${report.description eq 'Logout'}">
									<a class="username logoutCss"
										style="text-transform: uppercase;"
										href="javascript:logout('${fn:toUpperCase(userlang)}','${report.report_link}');"> <c:choose>
											<c:when test="${fn:containsIgnoreCase(userlang, 'fr')}">Déconnexion</c:when>
											<c:when test="${fn:containsIgnoreCase(userlang, 'zh')}">登出</c:when>
											<c:otherwise>${report.description}</c:otherwise>
										</c:choose>
									</a>
								</c:if>
							</c:forEach></li>
					</ul>
					<ul class="nav navbar-nav navbar-right hidden-xs"
						style="margin-top: 10px">
						<li class="userSettings" style="cursor: pointer"
							data-container="body" data-placement="bottom">
							<div id="userNav" class="logoutCss">
								<c:forEach var="report" items="${reportList}">
									<c:if test="${report.description eq 'Logout'}">
										<a class="username" href="javascript:logout('${fn:toUpperCase(userlang)}','${report.report_link}');"> <c:choose>
												<c:when test="${fn:containsIgnoreCase(userlang, 'fr')}">Déconnexion</c:when>
												<c:when test="${fn:containsIgnoreCase(userlang, 'zh')}">登出</c:when>
												<c:otherwise>${report.description}</c:otherwise>
											</c:choose>
										</a>
									</c:if>
								</c:forEach>
							</div>
						</li>
					</ul>
				</div>
				<!--/.nav-collapse -->

			</div>
		</div>

		<a id="userLocale" style="display: none">en</a>

		<div id="mainContent" style="margin-top: 90px !important;">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">

			<link href="${context}/resources/assets/css/style/bootstrap.min.css"
				rel="stylesheet">
			<link
				href="${context}/resources/assets/css/style/bootstrap-theme.css"
				rel="stylesheet">
			<link href="${context}/resources/assets/css/style/index.css"
				rel="stylesheet">
			<link href="${context}/resources/assets/css/style/header.css"
				rel="stylesheet">

			<c:if test="${singleouVal eq '' and DisplayOuList eq 'YES'}">
				<c:choose>
					<c:when test="${displayLinkStatus eq 'YES'}">
						<b>Select Country:</b>
						<br>
						<select id="OUCode" name='OUCodeName'
							onchange="searchAjax(this.value)">
							<c:forEach var="OUCodeName" items="${treeOUMap}">
								<option value="${OUCodeName.key}"><c:out
										value="${OUCodeName.value}" /></option>
							</c:forEach>
						</select>
					</c:when>
					<c:otherwise>
						<b>Select Country:</b>
						<br>
						<select id="OUCode" name='OUCodeName'
							onchange="searchAjax(this.value)">
							<c:forEach var="OUCodeName" items="${treeOUMap}">
								<option value="${OUCodeName.key}"><c:out
										value="${OUCodeName.value}" /></option>
							</c:forEach>
						</select>
					</c:otherwise>
				</c:choose>
			</c:if>
			<div
				style="font-weight: bold; font-family: Arial; font-size: 18%; font-size: 14px; color: #FA8072;"
				align="center">
				<c:forEach var="report" items="${reportList}">

					<c:if
						test="${DisplayErrorMessage ne 'NO' and DisplayErrorMessage eq 'error_msg_001' and report.description eq displayErrorDesc}">
						<c:choose>
							<c:when test="${fn:containsIgnoreCase(userlang, 'fr')}">Le pays n’a pas été sélectionné</c:when>
							<c:when test="${fn:containsIgnoreCase(userlang, 'en')}">No Country was selected</c:when>
							<c:when test="${fn:containsIgnoreCase(userlang, 'zh')}">未選擇國家/地區</c:when>
							<c:otherwise>No Country was selected</c:otherwise>
						</c:choose>
					</c:if>
					<c:if
						test="${DisplayErrorMessage ne 'NO' and DisplayErrorMessage eq 'error_msg_002' and report.description eq displayErrorDesc}">
						<c:choose>
							<c:when test="${fn:containsIgnoreCase(userlang, 'fr')}">Le pays sélectionné n’est pas accessible</c:when>
							<c:when test="${fn:containsIgnoreCase(userlang, 'en')}">Selected Country is not accessible</c:when>
							<c:when test="${fn:containsIgnoreCase(userlang, 'zh')}">無法顯示所選國家/地區</c:when>
							<c:otherwise>Selected Country is not accessible</c:otherwise>
						</c:choose>
					</c:if>
				</c:forEach>
			</div>
			<h3 class="hidden-xs"
				style="font-weight: bold; font-family: Arial; font-size: 65%; font-size: 16px; color: #404040"
				align="center">Retailer Transaction Settlement Platform</h3>
			<h4 class="hidden-xs"
				style="font-weight: bold; font-family: Arial; font-size: 65%; font-size: 16px; color: #404040"
				align="right">
				<c:if test="${displayLinkStatus eq 'YES'}">
					<%
						if (System.getProperty("ENV_NAME") != null) {
								out.println(System.getProperty("ENV_NAME"));
							}
					%>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
				</c:if>
			</h4>
			<c:if test="${displayLinkStatus eq 'YES'}">
				<c:forEach var="report" items="${reportList}" varStatus="status">
					<c:if
						test="${fn:containsIgnoreCase(report.description, displayLinkDesc)}">
						<div class=".col-md-3 button_colour default-buton-color"
							onclick="location.href='${report.report_link}';"
							style="float: right; text-align: center; padding: 2px !important; horizontaly-align: middle; border-radius: 5px; cursor: pointer !important;">
							<h4
								style="font-weight: bold; font-family: Arial; font-size: 18%; font-size: 14px; color: #404040;">${report.description}</h4>
						</div>
					</c:if>
				</c:forEach>
				<br>
				<br>
			</c:if>
			<div class="container-fluid"
				style="margin: 15px; padding-top: 20px; width: 100%">
				<div class="row" style="padding-right: 20px;"
					style="visibility: inherit;">
					<c:choose>
						<c:when test="${fn:length(reportList) eq 1}">
							<c:forEach var="report" items="${reportList}" varStatus="status">
								<c:redirect url="${report.report_link}" />
							</c:forEach>
						</c:when>
						<c:otherwise>
							<c:forEach var="report" items="${reportList}" varStatus="status">
								<c:if
									test="${fn:containsIgnoreCase(report.description, 'My Reports')}">
									<div class="col-md-3 boxDocumentItem default-bk-color"
										onclick="appendUrl('${report.report_link}')">
										<br>
										<h4 class="recentTitle">${report.description}</h4>
									</div>
								</c:if>
							</c:forEach>
							<c:forEach var="report" items="${reportList}" varStatus="status">
								<c:if
									test="${fn:containsIgnoreCase(report.description, 'Report Inquiry Portal')}">
									<div class="col-md-3 boxDocumentItem default-bk-color"
										onclick="appendUrl('${report.report_link}')">
										<br>
										<h4 class="recentTitle">${report.description}</h4>
									</div>
								</c:if>
							</c:forEach>
							<c:forEach var="report" items="${reportList}" varStatus="status">
								<c:if
									test="${fn:containsIgnoreCase(report.description, 'Merchant Services Portal')}">
									<div class="col-md-3 boxDocumentItem default-bk-color"
										onclick="appendUrl('${report.report_link}')">
										<br>
										<h4 class="recentTitle">${report.description}</h4>
									</div>
								</c:if>
							</c:forEach>
						</c:otherwise>
					</c:choose>




				</div>
			</div>
		</div>

	</div>
</body>
</html>
