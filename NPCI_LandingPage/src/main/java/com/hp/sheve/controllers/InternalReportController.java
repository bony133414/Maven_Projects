package com.hp.sheve.controllers;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hp.sheve.dao.InternalReport;
import com.hp.sheve.model.Report;

@Configuration
@ComponentScan(basePackages = { "com.hp.sheve.*" })
@PropertySource("classpath:reportsConfig.properties")
@Controller
public class InternalReportController {

	private Logger logger = Logger.getLogger(InternalReportController.class);

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private InternalReport report_link;

	private Properties ouProperties;

	@Value("${request.header.param}")
	private String requestParams;

	@Value("${externalize.link.status}")
	private String externalizeLinkStatus;
	
	@Autowired
	@Qualifier("ouProperties")
	public void setOuProperties(Properties ouProperties) {
		this.ouProperties = ouProperties;
	}

	public String getRequestParams() {
		return requestParams;
	}

	public void setRequestParams(String requestParams) {
		this.requestParams = requestParams;
	}

	private String uatlink = System.getProperty("UAT_URL");
	private String prodlink = System.getProperty("PROD_URL");

	Properties prop = new Properties();
	InputStream input = null;

	@RequestMapping(method = RequestMethod.GET, value = "/")
	public ModelAndView landingpage(Model model) {


		List<String> list = new ArrayList<String>();
		if (requestParams != null) {
			list = Arrays.asList(requestParams.split(","));
		}
		Map<String, String> paramMap = getHeadersInfo(list);

		String userRole = null;
	    String userlang = null;
		String OUCodes = null;

		if (paramMap.get("fed_role") != null && !"".equalsIgnoreCase(paramMap.get("fed_role"))) {
			userRole = paramMap.get("fed_role");
		} else if (paramMap.get("role") != null && !"".equalsIgnoreCase(paramMap.get("role"))) {
			userRole = paramMap.get("role");
		}

		if (paramMap.get("fed_language") != null && !"".equalsIgnoreCase(paramMap.get("fed_language"))) {
			userlang = paramMap.get("fed_language");
		} else if (paramMap.get("language") != null && !"".equalsIgnoreCase(paramMap.get("language"))) {
			userlang = paramMap.get("language");
		}

		if (paramMap.get("fed_CountryList") != null && !"".equalsIgnoreCase(paramMap.get("fed_CountryList"))) {
			OUCodes = paramMap.get("fed_CountryList");
			model.addAttribute("DisplayOuList", "YES");
		} else if (paramMap.get("CountryList") != null && !"".equalsIgnoreCase(paramMap.get("CountryList"))) {
			OUCodes = paramMap.get("CountryList");
			model.addAttribute("DisplayOuList", "YES");
		}
		
		Map<String, String> queryParameters = new HashMap<String, String>();
	    String queryString = request.getQueryString();
	    Map<String, String> OUCodesMap = new HashMap<>();
	    Map<String, String> treeOUMap = new TreeMap<String, String>();
	    
	    if (logger.isDebugEnabled()) {
			logger.debug("user language : " + userlang);
		}
		if (logger.isDebugEnabled()) {
			logger.debug("Country List Map : " + OUCodesMap);
		}
		
		if (userRole != null && !"".equalsIgnoreCase(userRole)) {
			List<Report> reportList = report_link.getReportDetails(userRole);
			if (reportList.size() == 2) {
				Iterator<Report> it = reportList.iterator();
				while (it.hasNext()) {
					Report report = it.next();
					if ("Logout".equalsIgnoreCase(report.getDescription())) {
						it.remove();
					}
				}
			} else if (reportList.size() > 2) {
				List<String> roleList = getRoleasList(userRole);
				String status = System.getProperty("FEATURE_STATUS") != null
						&& !"".equalsIgnoreCase(System.getProperty("FEATURE_STATUS"))
								? System.getProperty("FEATURE_STATUS") : "DESABLE";
				String name = System.getProperty("ENV_NAME") != null
						&& !"".equalsIgnoreCase(System.getProperty("ENV_NAME")) ? System.getProperty("ENV_NAME")
								: "NON";

				if (roleList.contains("HPE_SUPPORT") && "ENABLE".equals(status) && "UAT".equals(name)) {
					model.addAttribute("displayLinkStatus", "YES");
					Report report = new Report();
					report.setReport_link(prodlink);
					report.setDescription("Click here for PRD SUPP landing page");
					model.addAttribute("displayLinkDesc", "Click here for PRD SUPP landing page");
					reportList.add(report);
					System.out.println("Report Link: "+report.getReport_link());
				} else if (roleList.contains("HPE_SUPPORT") && "ENABLE".equals(status) && "PROD_SUPP".equals(name)) {
					model.addAttribute("displayLinkStatus", "YES");
					Report report = new Report();
					report.setReport_link(uatlink);
					report.setDescription("Click here for UAT landing page");
					model.addAttribute("displayLinkDesc", "Click here for UAT landing page");
					reportList.add(report);
				} else {
					model.addAttribute("displayProdLinkStatus", "NO");
				}
				
				if (OUCodes != null && !"".equalsIgnoreCase(OUCodes)) {
					
					OUCodes = OUCodes.replace("^", ",");
					String[] OUCodesArray = OUCodes.split(",");
					for (String OUCode : OUCodesArray) {
						if (ouProperties.getProperty(OUCode.toUpperCase()) != null
								&& !"".equalsIgnoreCase(ouProperties.getProperty(OUCode.toUpperCase()))) {
							model.addAttribute("singleOuMap",OUCode);
							OUCodesMap.put(OUCode, ouProperties.getProperty(OUCode.toUpperCase()));
						} 
					}
				}
				treeOUMap = new TreeMap<String, String>(OUCodesMap);
				
				if(OUCodesMap.size() == 1){
					model.addAttribute("singleouVal", "YES");
				} else {
					model.addAttribute("singleouVal", "");
				}
				
				if( queryString != null && !"".equalsIgnoreCase(queryString)){
			        String[] keyValuePair = queryString.split("=");
			        queryParameters.put(keyValuePair[0], keyValuePair[1]);
			        String errorcode = queryParameters.get(keyValuePair[0]);
			        Report report = new Report();
			        if(errorcode.equals("001")){
			        	report.setDescription("Error Msg 001");
			        	model.addAttribute("DisplayErrorMessage", "error_msg_001");
			        	model.addAttribute("displayErrorDesc", "Error Msg 001");
			        	reportList.add(report);
			        
			        }
			        else if(errorcode.equals("002")){
			        	report.setDescription("Error Msg 002");
			        	model.addAttribute("DisplayErrorMessage", "error_msg_002");
			        	model.addAttribute("displayErrorDesc", "Error Msg 002");
			        	reportList.add(report);
			        }
			        else{
			        	model.addAttribute("DisplayErrorMessage", "NO");
			        }
			        
			    }

			}

			if (logger.isDebugEnabled()) {
			}

			model.addAttribute("reportList", reportList);
			model.addAttribute("userlang", userlang);
			model.addAttribute("treeOUMap", treeOUMap);

			return new ModelAndView("reports-link-view");
		}
		return new ModelAndView("reports-link-view");
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/storeOUCode/{OUCODE}")
	public @ResponseBody String storeOUCode(@PathVariable("OUCODE") String oucode, HttpServletRequest request, HttpServletResponse response){
		System.out.println("OUCode inside session :" + oucode);
		if (logger.isDebugEnabled()) {
			logger.debug("Header Names ##### : " + oucode );
		}
 		request.getSession().setAttribute("CURRENT_SESSION_OU_CODE", oucode);
 		return "success";
	}

	private Map<String, String> getHeadersInfo(List<String> paramList) {

		Map<String, String> map = new HashMap<String, String>();

		for (String paramKey : paramList) {
			if (request.getHeader(paramKey) != null) {
				String paramVal = request.getHeader(paramKey);
				if (logger.isDebugEnabled()) {
					logger.debug("Header Names ##### : " + paramKey + "  Value ##### : " + paramVal);
				}

				if (paramVal != null && !"".equalsIgnoreCase(paramVal) && "role".equalsIgnoreCase(paramKey)) {
					List<String> roleLists = new ArrayList<String>();
					paramVal = paramVal.replace('^', '&');
					String[] roles = paramVal.split("&");
					for (String role : roles) {
						String[] pairs = role.split(",");
						for (String pair : pairs) {
							int idx = pair.indexOf("=");
							if ("CN".equalsIgnoreCase(pair.substring(0, idx))) {
								roleLists.add(pair.substring(idx + 1));
							}
						}
					}

					if (!roleLists.isEmpty()) {
						paramVal = roleLists.get(0);
						for (int i = 1; i < roleLists.size(); i++) {
							paramVal += "^" + roleLists.get(i);
						}
					}
				}
				if (logger.isDebugEnabled()) {
					logger.debug("After split ##### : " + paramKey + "  Value ##### : " + paramVal);
				}
				//System.out.println("After split ##### : " + paramKey + "  Value ##### : " + paramVal);

				map.put(paramKey, paramVal);
			}
		}
		return map;
	}

	private List<String> getRoleasList(String roles) {

		roles = roles.replace("^", ",");
		List<String> rolesList = new ArrayList<String>();

		if (roles.contains(",")) {
			rolesList = Arrays.asList(roles.split(","));
		} else {
			rolesList.add(roles);
		}
		return rolesList;
	}
	@RequestMapping(method = RequestMethod.GET, value = "/dumpheaders")
	public ModelAndView dumpheaders(Model model) {
		return new ModelAndView("dumpheaders");
	}

}
