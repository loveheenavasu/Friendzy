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

  return (
    <>
      {open && (
        <DatePicker
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
