package com.hp.sheve.dao;

import java.util.List;

import com.hp.sheve.model.Report;

public interface InternalReport {
	
	public List<Report> getReportDetails(String roles);

}
