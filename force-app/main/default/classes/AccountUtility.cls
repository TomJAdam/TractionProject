public with sharing class AccountUtility {
  @AuraEnabled(cacheable=true)
  public static List<Account> findAccounts(String searchKey) {
    try {
      List<Account> accountList = [SELECT Id, Name FROM Account LIMIT 10];

      return accountList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
