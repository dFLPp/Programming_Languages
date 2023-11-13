package transactions;

import account.Account;
public final class Transfer {

    private Transfer() {
        throw new IllegalStateException("Cannot be instantiated");
    }
    public static Boolean transferTransaction(Account sender, Account receiver, double amount){
        sender.resolveWithdrawal(amount);
        receiver.resolveDeposit(amount);
        return true;
    };
}
