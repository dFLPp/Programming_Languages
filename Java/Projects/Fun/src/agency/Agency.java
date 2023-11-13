package agency;

import account.Account;
import java.util.ArrayList;

public class Agency implements IAgency{

    public Agency(String name){
        this.accounts = new ArrayList<>();
        this.name = name;
    }

    private ArrayList<Account> accounts;
    public String name;
    public Boolean addAccount(Account account){
        try{
            if(account != null){
                this.accounts.add(account);
                return true;
            }
            return false;

        }
        catch (Exception e){
            System.out.println("Something went bananas when adding acc to agency");
            return false;
        }
    }
    public void showAccounts(){
        System.out.println("Accounts from Agency " + this.name);
        for(Account account : this.accounts){
            System.out.println(account.getId() + " → " + account.getName());
        }
    };

    public Account searchAccount(String id){
        for(Account acc : this.accounts){
            if(acc.getId().equals(id))
                return acc;
        }
        return null;
    }
    public Boolean removeAccount(String id){
        try{
            this.accounts.removeIf(acc -> acc.getId().equals(id));
            return true;
        }
        catch (Exception e){
            return false;
        }
    };

    public Boolean updateAccount(String id){
        System.out.println("então, oq é alteravel no obj Account é o obj Client");
        System.out.println("e tipo, mó chatam refator pra poder editar, deixa assim msm =)");
        return true;
    };
}
