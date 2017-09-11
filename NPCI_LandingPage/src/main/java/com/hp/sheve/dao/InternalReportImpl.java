package com.hp.sheve.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.hp.sheve.model.Report;

public class InternalReportImpl implements InternalReport {

	private Logger logger = Logger.getLogger(InternalReportImpl.class);

	private NamedParameterJdbcTemplate jdbcTemplate;
	private String sqlQuery;

	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	public void setSqlQuery(String sqlQuery) {
		this.sqlQuery = sqlQuery;
	}

	public List<Report> getReportDetails(String roles) {	
		roles = roles.replace("^", ",");
		List<String> rolesList = new ArrayList<String>();
		
		if(roles.contains(",")){
			rolesList = Arrays.asList(roles.split(","));
		} else {
			rolesList.add(roles);
		}
		
		Map<String, List<String>> parameters = Collections.singletonMap("roles", rolesList);
		
		List<Report> reportList = this.jdbcTemplate.query(sqlQuery, parameters,
				new RowMapper<Report>() {
					public Report mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						Report report = new Report();
						report.setDescription(rs.getString(1));
						report.setReport_link(rs.getString(2));
						return report;
					}
				});
		if(logger.isDebugEnabled()){
			for (Report r : reportList) {
				logger.debug(r.toString());
			}
		}
								
		return reportList;
	}

}
