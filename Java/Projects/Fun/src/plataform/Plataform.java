package plataform;
import client.Client;
import account.Account;
import agency.Agency;

import java.util.Scanner;
public class Plataform implements IPlataform {
    // idealmente eu receberia um json de um form ou algo do tipo

    public Scanner scanner;
    public Plataform(){
        this.scanner = new Scanner(System.in);
    }
    private Client createClient(){
        try{
            // deve ter uma forma menos redudante de fazer isso
            // saudades unpacking javascript

            System.out.println("name: ");
            String name = this.scanner.nextLine();
            System.out.println("surname: ");
            String surname = this.scanner.nextLine();
            System.out.println("cpf: ");
            String cpf = this.scanner.nextLine();
            System.out.println("address: ");
            String address = this.scanner.nextLine();
            System.out.println("phone number: ");
            String phoneNumber =  this.scanner.nextLine();
            System.out.println("age: ");
            double age = Double.parseDouble(this.scanner.nextLine());

            return new Client(name, surname, cpf, address, phoneNumber, age);
        }
        catch (Exception e){
            System.out.println("Something went bananas at creation of client");
            return null;
        }
    }
    private Account createAccount(Client owner){
        try {
            if(owner != null)
                return new Account(owner);
            else{
                return null;
            }
        }
        catch (Exception e){
            System.out.println("Something went bananas at creation of account");
            return null;
        }
    }

    public Account registerAccount(){
        try{
            Client c = this.createClient();
            if (c != null)
                return this.createAccount(c);
            else{
                return null;
            }
        }
        catch (Exception e){
            System.out.println("Something went bananas at account registration");
            return null;
        }
    }

    public void eventLoop(Agency agency){
        int opt = -1;
        do{

            try{
                System.out.println("1 - create acc");
                System.out.println("2 - delete acc");
                System.out.println("3 - update acc");
                System.out.println("4 - display accs");
                System.out.println("0 - exit");

                opt = Integer.parseInt(this.scanner.nextLine());

                if (opt == 1) {
                    agency.addAccount(this.createAccount(this.createClient()));
                }
                else if(opt == 2){
                    System.out.println("id: ");
                    agency.removeAccount(this.scanner.nextLine());
                }
                else if(opt == 3){
                    System.out.println("id: ");
                    agency.updateAccount(this.scanner.nextLine());
                }
                else if(opt == 4){
                    agency.showAccounts();
                }
                else {
                    break;
                }
            }
            catch (Exception e){
                System.out.println("Something went bananas (in here)");
                break;
            }

        }
        while(opt != 0);
    };

}
