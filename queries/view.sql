drop view data_based_on_p_id;
drop view data_based_on_su_id;

create view data_based_on_p_id as ( SELECT sud.p_id,sud.sud_year, sum(sud.sud_cases_stolen) "sud_cases_stolen",sum(sud.sud_value_stolen) "sud_value_stolen", sum(sud.sud_cases_recovered) "sud_cases_recovered", sum(sud.sud_value_recovered) "sud_value_recovered" FROM state_ut_data sud GROUP BY sud.p_id,sud.sud_year order by sud.p_id,sud.sud_year);


create view data_based_on_su_id as ( SELECT sud.su_id,sud.sud_year, sum(sud.sud_cases_stolen) "sud_cases_stolen",sum(sud.sud_value_stolen) "sud_value_stolen", sum(sud.sud_cases_recovered) "sud_cases_recovered", sum(sud.sud_value_recovered) "sud_value_recovered" FROM state_ut_data sud GROUP BY sud.su_id,sud.sud_year order by sud.su_id,sud.sud_year);
