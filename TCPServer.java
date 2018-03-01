
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.io.BufferedReader;


public class TCPServer {

    final int PORT= 13337;
    public void testMethod(){
        try{
            System.out.println("About to create the server scocket");
            ServerSocket server= new ServerSocket(PORT);//creating the SS
            System.out.println("Server socket created");
            
            System.out.println("About to accept");
            //we have to use a loop to eliminate stop the server then users can add to it any time no need to start the server agian and again

            for(;;){
            	Socket client = server.accept();//still waiting and do not rerurn
            	System.out.println("accept returned");
            	System.out.println("Client is Connected from"+client.getInetAddress());
            	Date today = new Date();
            	PrintWriter out = new PrintWriter(client.getOutputStream(),true);
            	out.println(today);
            	System.out.println("Sent Date time"+today);
            
            	//get the client input 
            	System.out.println("Waiting for client input");
            	InputStream is = client.getInputStream();
            	BufferedReader br = new BufferedReader(new InputStreamReader(is));
            	String input = br.readLine();
            	System.out.println("input from client : "+input);
            	client.close();
            	System.out.println("close the client and waiting for the next client\n");
            }  
              
        } catch(IOException e){
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {

        new TCPServer().testMethod();
    }
    
}
