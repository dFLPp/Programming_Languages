package account;

import java.util.UUID;

import client.Client;
import static constants.Constants.MIN_WITHDRAWAL;
import static constants.Constants.DEPOSIT_TRESHOLD_ALERT;
import static transactions.Transfer.transferTransaction;
public class Account implements IAccount {

    public Account(Client owner){
        this.id =  UUID.randomUUID().toString();
        this.owner = owner;
        this.balance = 0;
    }
    private final String id;

    public String getId(){
        return this.id;
    }

    public String getName(){
        return this.owner.getName();
    }
    private final Client owner;

    private double balance;
    public double getBalance(){
        return this.balance;
    };

    public Boolean resolveWithdrawal(double amount){
        if(amount > MIN_WITHDRAWAL && this.balance - amount >= 0){
            this.balance -= amount;
            return true;
        }
        else{
            return false;
        }
    };
    public Boolean resolveDeposit(double amount){
        if(amount > 0){
            if(amount > DEPOSIT_TRESHOLD_ALERT){
                System.out.println("Lavando dinheiro né seu safado");
                return false;
            }
            else{

                this.balance += amount;
                return true;
            }
        }
        else{
            return false;
        }
    };

    public Boolean resolveTransfer(double amount, Account receiver){
        if(amount > 0){
            if(clientValidation(this.owner)){
                transferTransaction(this, receiver, amount);
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    };


    private Boolean clientValidation(Client acc){
        return acc.canMakeTransfer();
    }

}
