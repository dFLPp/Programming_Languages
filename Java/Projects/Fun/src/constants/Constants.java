package constants;

public final class Constants {

    private Constants() {
        throw new IllegalStateException("Cannot be instantiated");
        // dessa forma a classe não pode ser instanciada ou herdada
        // somente pode ser usada como referência
    }

    public static final double MIN_WITHDRAWAL = 3.14159;
    public static final double DEPOSIT_TRESHOLD_ALERT = 49999.999;
}