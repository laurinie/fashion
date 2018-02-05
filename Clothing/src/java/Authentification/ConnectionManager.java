package Authentification;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dizotoff
 */
import java.sql.*;
   import java.util.*;


   public class ConnectionManager {

      static Connection con;
      static String url;
            
      public static Connection getConnection()
      {
        
         try
         {
            String url = "jdbc:odbc:" + "mysql://localhost:3306/fashionproject"; 
            // assuming "DataSource" is your DataSource name

            Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            
            try
            {            	
               con = DriverManager.getConnection(url,"root","fashion"); 
                								
            // assuming your SQL Server's	username is "username"               
            // and password is "password"
                 
            }
            
            catch (SQLException ex)
            {
               ex.printStackTrace();
            }
         }

         catch(ClassNotFoundException e)
         {
            System.out.println(e);
         }

      return con;
}
   }
