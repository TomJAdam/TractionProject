public with sharing class ItemUtility {
  @AuraEnabled(cacheable=true)
  public static List<Item__c> findItems(String searchKey) {
    String keyWord = '%' + searchKey + '%';

    try {
      List<Item__c> itemList = [
        SELECT Id, Name, Is_Checked_Out__c, Category__r.Name
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
  public static Item__c checkoutItem(Id objectId) {
    try {
      List<Item__c> items = [
        SELECT Id, Is_Checked_Out__c
        FROM Item__c
        WHERE Id = :objectId
      ];

      Item__c item = items[0];

      if (item.Is_Checked_Out__c == true) {
        throw new AuraHandledException('Book already checked out');
      }

      item.Is_Checked_Out__c = true;
      update item;

      return item;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
