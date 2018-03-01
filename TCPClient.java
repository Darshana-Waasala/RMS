
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;


public class TCPClient {

    public final static int SERVICE_PORT = 13337;

    public static void main(String[] args) {

        try {
            Socket socClient = new Socket("localhost", SERVICE_PORT);
            
                InputStream is = socClient.getInputStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String recievedData = br.readLine();
                System.out.println("recieved data:" + recievedData);
                
                //outputing data to server
                Scanner scan = new Scanner(System.in);
                String text = scan.nextLine();
                
                DataOutputStream outStram = new DataOutputStream(socClient.getOutputStream());
                //outStram.writeBytes("Hello this is client here ......\n");
                outStram.writeBytes(text+"\n");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
