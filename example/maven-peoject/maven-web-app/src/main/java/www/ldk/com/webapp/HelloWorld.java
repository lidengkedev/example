package www.ldk.com.webapp;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by lidengke on 2018/10/23.
 */
public class HelloWorld extends GenericServlet{
    @Override
    public void service(ServletRequest servletRequest,ServletResponse servletResponse) throws ServletException, IOException{
        OutputStream out = servletResponse.getOutputStream();
        out.write("Hello Servlet!!".getBytes());
    }
}
