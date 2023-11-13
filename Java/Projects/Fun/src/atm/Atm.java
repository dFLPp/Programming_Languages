package atm;

import account.Account;
import agency.Agency;
import java.util.Scanner;

public class Atm {

    private Scanner scanner;

    public Atm(){
         this.scanner = new Scanner(System.in);
    }

    private Account logIn(String id, Agency agency){
        return agency.searchAccount(id);
    }
    public void eventLoop(Agency agency){
        System.out.println("Faça login com seu id: ");
        Account acc = logIn(this.scanner.nextLine(), agency);
        if(acc != null){
            int opt = -1;
            do{

                try{
                    System.out.println("1 - withdrawal");
                    System.out.println("2 - deposit");
                    System.out.println("3 - transfer");
                    System.out.println("4 - balance");
                    System.out.println("0 - exit");

                    opt = Integer.parseInt(this.scanner.nextLine());

                    if (opt == 1) {
                        System.out.println("How much?");
                        acc.resolveWithdrawal(Double.parseDouble(this.scanner.nextLine()));
                    }
                    else if(opt == 2){
                        System.out.println("How much?");
                        acc.resolveDeposit(Double.parseDouble(this.scanner.nextLine()));
                    }
                    else if(opt == 3){
                        System.out.println("unable in the moment");
                    }
                    else if(opt == 4){
                        System.out.println("Your balance is " + acc.getBalance());
                    }
                    else {
                        break;
                    }
                }
                catch (Exception e){
                    System.out.println("Something went bananas at the menu");
                    break;
                }

            }
            while(opt != 0);
        }
        else{
            System.out.println("Something went bananas while logging in");
        }
    };
}
