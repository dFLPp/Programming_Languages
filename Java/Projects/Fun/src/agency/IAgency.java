package agency;

import account.Account;

public interface IAgency {
    public void showAccounts();
    public Boolean addAccount(Account account);

    public Boolean removeAccount(String id);
    public Boolean updateAccount(String id);

    public Account searchAccount(String id);
}
