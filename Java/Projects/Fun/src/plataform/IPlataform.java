package plataform;

import account.Account;
import agency.Agency;

public interface IPlataform {
    public Account registerAccount();
    public void eventLoop(Agency agency);
}
