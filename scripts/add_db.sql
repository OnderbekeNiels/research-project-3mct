CREATE DATABASE StackOverflow 
ON 
  (name = so1,   filename = N'/var/opt/mssql/data/StackOverflow2013_1.mdf'),
  (name = so2,   filename = N'/var/opt/mssql/data/StackOverflow2013_2.ndf'),
  (name = so3,   filename = N'/var/opt/mssql/data/StackOverflow2013_3.ndf'),
  (name = so4,   filename = N'/var/opt/mssql/data/StackOverflow2013_4.ndf')
FOR ATTACH;