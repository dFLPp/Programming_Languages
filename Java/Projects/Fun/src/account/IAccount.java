package account;

public interface IAccount {
    public Boolean resolveWithdrawal(double amount);
    public Boolean resolveDeposit(double amount);

    public Boolean resolveTransfer(double amount, Account receiver);
}
