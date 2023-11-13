package client;

import java.util.UUID;

public class Client implements IClient{

    public Client (String name, String surname, String cpf, String address, String phoneNumber, double age){
        this.id =  UUID.randomUUID().toString();
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.address = address;
        this.cpf = cpf;
        this.phoneNumber = phoneNumber;

        this.isVulnerable = false;
        this.haveDebt = false;
    }


    private final String id;
    private String email;
    private String cpf;
    private String address;
    private String phoneNumber;
    private Boolean isVulnerable;
    private Boolean haveDebt;
    private String name;
    private String surname;
    private double age;

    public String getName(){
        return this.name;
    }
    public Boolean canMakeTransfer(){
        if(!this.isVulnerable && !this.haveDebt){
            return true;
        }
        else{
            return false;
        }
    }
}
