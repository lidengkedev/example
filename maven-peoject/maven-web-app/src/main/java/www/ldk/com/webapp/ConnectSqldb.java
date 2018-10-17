package www.ldk.com.webapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by lidengke on 2018/06/24.
 * 数据库连接
 */

public class ConnectSqldb {
    public static void main(String[] args) {
        //声明 Connection 对象
        Connection conn;
        //驱动名称
        String driver = "com.mysql.jdbc.Driver";
        //URL指向要访问的数据库名mydata
        String url = "jdbc:mysql://localhost:3306/model_abc";
        //MySQL配置时的用户名
        String user = "root";
        //MySQL配置时的密码
        String password = "root";
        //遍历查询结果集
        try {
            //加载驱动程序
            Class.forName(driver);
            //1.getConnection()方法，连接MySQL数据库！！
            conn = DriverManager.getConnection(url,user,password);
            if (!conn.isClosed()) {
                System.out.println("数据库连接成功");
            }
            //2.创建statement类对象，用来执行SQL语句！！
            Statement statement = conn.createStatement();
            //要执行的SQL语句
            String sql = "SELECT * FROM model_abc.logo";
            //3.ResultSet类，用来存放获取的结果集！！
            ResultSet resultSet = statement.executeQuery(sql);
            String username;
            String pwd;
            while (resultSet.next()) {
                username = resultSet.getString("username");
                pwd = resultSet.getString("password");
                System.out.println("姓名：" + username);
                System.out.println("密码：" + pwd);
            }
            resultSet.close();
            conn.close();
        } catch (ClassNotFoundException e) {
            //数据库驱动类异常处理
            System.out.println("数据库驱动没有安装");
            e.printStackTrace();
        } catch (SQLException e) {
            //数据库连接失败异常处理
            System.out.println("数据库连接失败");
            e.printStackTrace();
        } catch (Exception  e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            System.out.print("数据库数据成功获取");
        }
    }
}
