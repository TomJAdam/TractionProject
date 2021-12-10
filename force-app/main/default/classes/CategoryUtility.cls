public with sharing class CategoryUtility {
  @AuraEnabled(cacheable=true)
  public static List<Category__c> findCategories(String searchKey) {
    String key = '%' + searchKey + '%';
    return [SELECT Id, Name FROM Category__c WHERE Name LIKE :key LIMIT 10];
  }
}
