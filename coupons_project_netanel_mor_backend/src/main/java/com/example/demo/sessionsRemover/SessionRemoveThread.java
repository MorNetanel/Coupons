package com.example.demo.sessionsRemover;

import com.example.demo.beans.ClientSession;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class SessionRemoveThread implements Runnable {
    private HashMap<String, ClientSession> sessions;

    public SessionRemoveThread(HashMap<String, ClientSession> sessions) {
        this.sessions = sessions;
    }



    @Override
    public void run() {
        while (true){

            Date now = new Date(System.currentTimeMillis());


            //remove if time is pass
            sessions.entrySet().removeIf(session -> now.getTime() > session.getValue().getLastActive() + (1000 * 60 * 30));

            //check interval
                try {
                    Thread.sleep(1000 * 60);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

//                //print services
//            for (ClientSession s: sessions.values()) {
//                System.out.println(s.getService());
//            }
//
//            //print if hashmap is empty
//                if(sessions.isEmpty()){
//                    System.out.println("sessions is empty");
//                }
        }
    }
}

