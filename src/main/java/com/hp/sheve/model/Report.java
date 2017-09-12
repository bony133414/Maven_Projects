package com.hp.sheve.model;

public class Report {

	int reportid;
	String role;
	String report_link;

	String description;
	String language;

	public Report() {

	}

	public Report(int reportid, String role, String report_link,
			String description, String language) {

		this.reportid = reportid;
		this.report_link=report_link;
		this.description = description;
		this.role = role;
		this.language = language;
	}

	public int getReportid() {
		return reportid;
	}

	public void setReportid(int reportid) {
		this.reportid = reportid;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getReport_link() {
		return report_link;
	}

	public void setReport_link(String report_link) {
		this.report_link = report_link;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	@Override
	public String toString() {
		return "Report [reportid=" + reportid + ", role=" + role
				+ ", report_link=" + report_link + ", description="
				+ description + ", language=" + language + "]";
	}

}
