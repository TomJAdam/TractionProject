public with sharing class ItemHistoryController {
  @AuraEnabled(cacheable=true)
  public static List<Item_History__c> findItemHistory(String searchKey) {
    String key = '%' + searchKey + '%';
    return [
      SELECT
        Id,
        Account__r.Name,
        Item__r.Name,
        Withdrawn__c,
        Due_Back__c,
        Date_Returned__c
      FROM Item_History__c
      WHERE Account__r.Name LIKE :key OR Item__r.Name LIKE :Key
      ORDER BY Date_Returned__c NULLS FIRST
    ];
  }
}
