--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
--

CREATE TABLE public.db_user (
    u_email character varying(320) NOT NULL,
    u_fname character(30),
    u_lname character(30),
    u_primary_phno bigint,
    u_acc_type character(10),
    CONSTRAINT db_user_u_email_check CHECK (((u_email)::text ~~ '%@%'::text))
);



--
--

CREATE TABLE public.security_for_state (
    sp_id integer,
    su_id integer,
    sp_perm integer
);



--
--

CREATE TABLE public.securitypolicy (
    sp_id integer NOT NULL,
    sp_name character varying(50)
);



--
--

CREATE TABLE public.session (
    s_key character(36) NOT NULL,
    s_start_time time without time zone,
    u_email character varying(320)
);



--
--

CREATE TABLE public.state_ut (
    su_id integer NOT NULL,
    su_name character varying(50)
);



--
--

CREATE TABLE public.state_ut_data (
    su_id integer NOT NULL,
    property_type character varying(30) NOT NULL,
    sud_year integer,
    sud_cases_stolen integer,
    sud_value_stolen double precision,
    sud_cases_recovered integer,
    sud_value_recovered double precision,
    CONSTRAINT state_ut_data_check CHECK ((sud_value_recovered <= sud_value_stolen))
);



--
--

COPY public.db_user (u_email, u_fname, u_lname, u_primary_phno, u_acc_type) FROM stdin;
nas@gmail.com	Nas                           	Illmatic                      	123456789	admin     
lamar@gmail.com	Kendrick                      	GKMC                          	234567890	admin     
wayne@gmail.com	Weezy                         	Carter                        	456789012	user      
mac@gmail.com	Mac                           	Swimming                      	567890123	user      
MFDOOM@gmail.com	MF                            	Madvillainy                   	345678901	user      
\.


--
--

COPY public.security_for_state (sp_id, su_id, sp_perm) FROM stdin;
3	1	0
3	2	0
3	3	0
3	4	0
3	5	0
3	6	0
3	7	0
3	8	2
3	9	2
3	10	0
3	11	0
3	12	0
3	13	0
3	14	0
3	15	0
3	16	0
3	17	0
3	18	0
3	19	0
3	22	0
3	23	0
3	24	0
3	25	0
3	26	0
3	27	0
3	28	0
3	29	0
3	30	2
3	31	0
3	32	2
3	33	2
3	34	2
3	35	0
3	36	0
3	20	2
3	21	2
\.


--
--

COPY public.securitypolicy (sp_id, sp_name) FROM stdin;
3	Northern States
4	North Eastern Zone
5	Central Zone
6	Eastern Zone
7	Western Zone
8	Southern Zone
9	Other
\.


--
--

COPY public.session (s_key, s_start_time, u_email) FROM stdin;
key1                                	12:17:10.511419	nas@gmail.com
key2                                	12:17:17.525258	lamar@gmail.com
key3                                	12:31:03.010643	lamar@gmail.com
\.


--
--

COPY public.state_ut (su_id, su_name) FROM stdin;
1	Andhra Pradesh
2	Arunachal Pradesh
3	Assam
4	Bihar
5	Chhattisgarh
6	Goa
7	Gujarat
8	Haryana
9	Himachal Pradesh
10	Jharkhand
11	Karnataka
12	Kerala
13	Madhya Pradesh
14	Maharashtra
15	Manipur
16	Meghalaya
17	Mizoram
18	Nagaland
19	Odisha
20	Punjab
21	Rajasthan
22	Sikkim
23	Tamil Nadu
24	Telangana
25	Tripura
26	Uttar Pradesh
27	Uttarakhand
28	West Bengal
29	A&N Islands
30	Chandigarh
31	D&N Haveli and Daman & Diu
32	Delhi
33	Jammu & Kashmir
34	Ladakh
35	Lakshadweep
36	Puducherry
\.


--
--

COPY public.state_ut_data (su_id, property_type, sud_year, sud_cases_stolen, sud_value_stolen, sud_cases_recovered, sud_value_recovered) FROM stdin;
1	Motor Vehicles	2021	5564	35.5	3334	20.1
2	Motor Vehicles	2021	314	6.5	45	1.1
3	Motor Vehicles	2021	4773	48.1	1257	10.2
4	Motor Vehicles	2021	27838	104.4	4264	18.5
5	Motor Vehicles	2021	4537	20.7	1306	8.2
\.


--
--

ALTER TABLE ONLY public.db_user
    ADD CONSTRAINT db_user_pkey PRIMARY KEY (u_email);


--
--

ALTER TABLE ONLY public.securitypolicy
    ADD CONSTRAINT securitypolicy_pkey PRIMARY KEY (sp_id);


--
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (s_key);


--
--

ALTER TABLE ONLY public.state_ut_data
    ADD CONSTRAINT state_ut_data_pkey PRIMARY KEY (su_id, property_type);


--
--

ALTER TABLE ONLY public.state_ut
    ADD CONSTRAINT state_ut_pkey PRIMARY KEY (su_id);


--
--

ALTER TABLE ONLY public.security_for_state
    ADD CONSTRAINT security_for_state_sp_id_fkey FOREIGN KEY (sp_id) REFERENCES public.securitypolicy(sp_id);


--
--

ALTER TABLE ONLY public.security_for_state
    ADD CONSTRAINT security_for_state_su_id_fkey FOREIGN KEY (su_id) REFERENCES public.state_ut(su_id);


--
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_u_email_fkey FOREIGN KEY (u_email) REFERENCES public.db_user(u_email);


--
--

ALTER TABLE ONLY public.state_ut_data
    ADD CONSTRAINT state_ut_data_su_id_fkey FOREIGN KEY (su_id) REFERENCES public.state_ut(su_id);


--
-- PostgreSQL database dump complete
--

