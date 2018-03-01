
import java.net.ServerSocket;
import java.net.Socket;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class WebSocketServer{
    public static void main(String[] args){

	try{

	
		ServerSocket server = new ServerSocket(13337);

		System.out.println("Server has started on 127.0.0.1:13337.\r\nWaiting for a connection...");

		Socket client = server.accept();

		System.out.println("A client connected.");
		InputStream in = client.getInputStream();
		System.out.println(in);

		OutputStream out = client.getOutputStream();
		System.out.println(out);

		//new Scanner(in, "UTF-8").useDelimiter("\\r\\n\\r\\n").next();

	}catch(IOException exception){
		System.out.println(exception);
	}
    }
}
