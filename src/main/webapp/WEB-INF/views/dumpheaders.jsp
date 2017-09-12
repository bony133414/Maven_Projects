<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.util.*"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Echo</title>
<style>
<
jsp
:include
 
page
="style
.css
"
 
flush
="true"/
>
</style>
<title>Insert title here</title>
</head>
<body>
	<h1>HTTP Request Headers Received</h1>
	<table border="1" cellpadding="4" cellspacing="0">
		<%
			Enumeration eNames = request.getHeaderNames();
			while (eNames.hasMoreElements()) {
				String name = (String) eNames.nextElement();
				String value = normalize(request.getHeader(name));
		%>
		<tr>
			<td><%=name%></td>
			<td><%=value%></td>
		</tr>
		<%
			}
		%>
	</table>
</body>
</html>
<%!private String normalize(String value) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < value.length(); i++) {
			char c = value.charAt(i);
			sb.append(c);
			if (c == ';')
				sb.append("<br>");
		}
		return sb.toString();
	}%>