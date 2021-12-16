public with sharing class ItemUtility {
  @AuraEnabled(cacheable=true)
  public static List<Item__c> findItems(String searchKey) {
    String keyWord = '%' + searchKey + '%';

    try {
      List<Item__c> itemList = [
        SELECT Id, Name, Is_Checked_Out__c, Category__r.Name
        FROM Item__c
        WHERE Name LIKE :keyWord OR Category__r.Name LIKE :keyWord
        ORDER BY Is_Checked_Out__c
      ];

      return itemList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static Item__c checkoutBook(Id objectId, Id accountId) {
    try {
      if (accountId == null) {
        throw new AuraHandledException('Please select an account');
      }

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

      Item_History__c record = new Item_History__c(
        Account__c = accountId,
        Item__c = item.Id
      );

      update item;
      insert record;

      return item;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static Item__c returnBook(Id objectId, Id accountId) {
    try {
      List<Item__c> items = [
        SELECT Id, Is_Checked_Out__c
        FROM Item__c
        WHERE Id = :objectId
      ];

      Item__c item = items[0];

      if (item.Is_Checked_Out__c == false) {
        throw new AuraHandledException('Book is still available');
      }

      item.Is_Checked_Out__c = false;

      List<Item_History__c> history = [
        SELECT Id
        FROM Item_History__c
        WHERE
          Account__c = :accountId
          AND Item__c = :objectId
          AND Date_Returned__c = NULL
      ];

      Item_History__c record = history[0];

      record.Date_Returned__c = Date.today();

      // throw exception if more than one record

      update record;
      update item;

      return item;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
