import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import DatePicker from 'react-native-date-picker';

interface Props {
  open: boolean;
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const SelectDateTime: FC<Props> = ({open, date, onConfirm, onCancel}) => {
  const currentDate = new Date();
  // Subtract 10 years from the current date
  const tenYearsAgo = new Date(currentDate);
  tenYearsAgo.setFullYear(currentDate.getFullYear() - 10);
  return (
    <>
      {open && (
        <DatePicker
          maximumDate={Platform.OS === 'ios' ? tenYearsAgo : new Date()}
          modal
          open={open}
          date={date}
          onConfirm={onConfirm}
          onCancel={onCancel}
          mode="date"
        />
      )}
    </>
  );
};

export default SelectDateTime;

const styles = StyleSheet.create({});
