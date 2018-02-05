/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package web;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 *
 * @author Joni
 */
public class DataBaseConnection {

    String url;
    Connection con;
    Statement stmt;

    public DataBaseConnection() {
        try {
            
            Class.forName("com.mysql.jdbc.Driver");

            url = "jdbc:mysql://localhost:3306/fashionproject";
            con = DriverManager.getConnection(url, "root", "fashion");
            stmt = con.createStatement();

        } catch (Exception e) {
            System.out.println("Error");
            System.err.println(e.getMessage());
        }
    }
    
    
    public String getClothingArticles() {
        
   

        String sql = "select * from clothingarticle;";
        String paluu = "";
        try {
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                int id = rs.getInt("id");
                String item = rs.getString("item");
                String name = rs.getString("name");
                int quantity = rs.getInt("quantity");
                float avgprice = rs.getFloat("avgprice");
                float salesmargin = rs.getFloat("salesmargin");
                float budget = rs.getFloat("budget");
                System.out.format("%s, %s, %s, %s, %s, %s, %s", id,item,name,quantity,avgprice,salesmargin,budget);
                System.out.println("");
                paluu +="id: "+id+" item: "+item+" name: "+name+" quantity: "+quantity+" avgprice: "+avgprice+" salesmargin: "+salesmargin+" budget: "+budget+"\n";
            }
            
        } catch (Exception e) {
            System.out.println("Error");
            System.err.println(e.getMessage());
        }
        return paluu;
    }
    public String addClothingArticles(String item, String name,int quantity, float avgprice,float salesmargin,float budget) {

        String sql = "insert into clothingarticle values(default,\""+item+"\",\""+name+"\","+quantity+","+avgprice+","+salesmargin+","+budget+");";
        String paluu = "";
        try {
            stmt.executeUpdate(sql);
            while (sql.equals(con)) {
                
            }
        } catch (Exception e) {
            System.out.println("Error");
            System.err.println(e.getMessage());
        }
        return paluu;
    }
    
    
    
    
    
    
    
    
    
    protected void finalize() throws Throwable {
        try {
            con.close();
        } finally {
            super.finalize();
        }
    }
    
}

