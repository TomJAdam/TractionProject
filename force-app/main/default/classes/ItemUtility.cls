public with sharing class ItemUtility {
  @AuraEnabled(cacheable=true)
  public static List<Item__c> findItems(String searchKey) {
    String keyWord = '%' + searchKey + '%';

    try {
      List<Item__c> itemList = [
        SELECT Id, Name, Category__r.Name
        FROM Item__c
        WHERE Name LIKE :keyWord OR Category__r.Name LIKE :keyWord
        LIMIT 10
      ];

      return itemList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static SObject checkoutBook(String Id) {
    try {
      List<Item__c> items = [
        SELECT Id, Is_Checked_Out__c
        FROM Item__c
        WHERE Id = :Id
      ];

      Item__c item = items[0];

      if (item.Is_Checked_Out__c) {
        throw new AuraHandledException('Book already checked out');
      }

      System.debug(item);

      item.Is_Checked_Out__c = true;
      update item;

      return item;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
