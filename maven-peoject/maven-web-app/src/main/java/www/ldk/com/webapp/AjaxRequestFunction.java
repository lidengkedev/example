package www.ldk.com.webapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logo")
public class AjaxRequestFunction {
    @GetMapping("/get")
    public ResultBean get() {
        System.out.println("TestController.get()");
        return new ResultBean("get ok");
    }
}
